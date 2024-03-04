import json
import logging
import os
from typing import List, Tuple

import requests
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor

CLIENT_ID = os.environ.get("CLIENT_ID", default="")
SECRET = os.environ.get("SECRET", default="")


base_url = "https://api-m.sandbox.paypal.com"
logger = logging.getLogger(__name__)


components_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "resistor": Resistor,
    "capacitor": Capacitor,
    "inductor": Inductor,
    "diode": Diode,
}


class OrderCreationHandler:
    def send_request(self, items, total_price) -> str:
        """
        Sends a request to create a PayPal buy order for the user to be payed.

        Args:
            inputs (dict): Input data for creating the order.

        Returns:
            str: The payment URL.
        """
        access_token = self.get_access_token()

        logger.debug(
            "Sending Request.   Total Price: %s Items Sent: %s", total_price, items
        )

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        }

        purchase_units = [
            {
                "reference_id": "cart",
                "amount": {
                    "currency_code": "USD",
                    "value": total_price,
                    "breakdown": {
                        "item_total": {"currency_code": "USD", "value": total_price}
                    },
                },
                "items": items,
            }
        ]

        data = {
            "intent": "CAPTURE",
            "purchase_units": purchase_units,
            "payment_source": {
                "paypal": {
                    "experience_context": {
                        "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                        "brand_name": "Electronic Component Ecomerce",
                        "locale": "en-US",
                        "landing_page": "LOGIN",
                        "user_action": "PAY_NOW",
                        "return_url": "http://localhost:3000/purchase-confirmation",
                        "cancel_url": "http://localhost:3000/Cart",
                    }
                }
            },
        }
        response = requests.post(
            f"{base_url}/v2/checkout/orders", headers=headers, data=json.dumps(data)
        ).json()

        if response.get("name") == "INVALID_REQUEST":
            raise Exception("Invalid Request: ", response)

        payment_url = response["links"][1]["href"]

        logger.debug("Successful request.  URL recived %s", payment_url)

        return payment_url

    def proccess_data(
        self, products_to_purchase: List[dict]
    ) -> Tuple[List[dict], float]:
        """Process data for creating a PayPal order.

        Args:
            products_to_purchase (list): List of products to purchase.

        Returns:
            Tuple[List[dict], float]: A tuple containing items and total price of all items.
        """

        products_by_type = {}
        items = []
        total_price = 0

        for kwargs in products_to_purchase:
            component_type = kwargs["component_type"].name
            component_id = kwargs["component_id"]

            # stores all component IDs based on their type
            if component_type in products_by_type:
                products_by_type[component_type].append(int(component_id))
            else:
                products_by_type[component_type] = [int(component_id)]

            item_reference = component_type + "-" + component_id

            items.append(
                {
                    "name": item_reference,
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": round(kwargs["price"], 2),
                    },
                    "quantity": kwargs["quantity"],
                }
            )
            total_price += kwargs["price"] * kwargs["quantity"]
        total_price = round(total_price, 2)
        self.check_products(products_by_type)

        return items, total_price

    def check_products(self, products_by_type):
        """Check if the products to be purchased exist.

        Args:
            products_by_type (dict): A dictionary mapping product types to lists of IDs.

        Raises:
            Exception: If a non-existing product is given.
        """
        errors = []

        for product_type, id_list in products_by_type.items():
            ComponentModel = components_mapping[product_type]
            products = ComponentModel.objects.filter(is_active=True)

            if any(
                [
                    id not in list(products.values_list("id", flat=True))
                    for id in id_list
                ]
            ):
                errors.append(f"A non-existing {product_type} was given")

        if errors:
            raise Exception(f"{errors}")

    def get_access_token(self):
        """
        Retrives the access token to comunicate with the paypal API.

        Returns:
            access_token (str): The access token given by paypal.

        Raises:
            Exception: if it there was a problem to authenticate.
        """
        token_payload = {"grant_type": "client_credentials"}
        token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

        token_response = requests.post(
            base_url + "/v1/oauth2/token",
            auth=(CLIENT_ID, SECRET),
            data=token_payload,
            headers=token_headers,
        )

        if token_response.status_code != 200:
            raise Exception("Failed to authenticate with PayPal API")

        return token_response.json()["access_token"]
