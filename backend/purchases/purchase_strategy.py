import json
import os
from abc import ABC, abstractmethod
from decimal import Decimal
from typing import List, Tuple

import requests
from dotenv import load_dotenv
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from purchases.models import ProductPurchase, User
from purchases.schema.types import ProductPurchaseType

load_dotenv()

CLIENT_ID = os.environ["CLIENT_ID"]
SECRET = os.environ["SECRET"]

base_url = "https://api-m.sandbox.paypal.com"


components_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "RESISTOR": Resistor,
    "CAPACITOR": Capacitor,
    "INDUCTOR": Inductor,
    "DIODE": Diode,
}


class PaypalApiStrategy(ABC):
    @abstractmethod
    def send_request(self):
        pass


class PurchaseContext:
    def __init__(self, strategy: PaypalApiStrategy):
        self._strategy = strategy

    @property
    def strategy(self) -> PaypalApiStrategy:
        return self._strategy

    def execute_strategy(self, inputs):
        return self.strategy.send_request(inputs)


class CreateOrderStrategy(PaypalApiStrategy):
    def send_request(self, inputs) -> str:
        """Sends a request to create a PayPal buy order for the user to be payed.

        Args:
            inputs (dict): Input data for creating the order.

        Returns:
            str: The payment URL.
        """

        items, total_price = self.proccess_data(inputs)

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

        access_token = token_response.json()["access_token"]

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
                        "return_url": "https://http://localhost:3000/cart",
                        "cancel_url": "https://http://localhost:3000/cart",
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
        return payment_url

    def proccess_data(self, inputs) -> Tuple[List[dict], float]:
        """Process data for creating a PayPal order.

        Args:
            inputs (dict): Input data for creating the order.

        Returns:
            Tuple[List[dict], float]: A tuple containing items and total price of all items.
        """
        products_kwargs = inputs["products_to_purchase"]
        products_by_type = {}
        items = []
        total_price = 0

        for kwargs in products_kwargs:
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
                    "unit_amount": {"currency_code": "USD", "value": kwargs["price"]},
                    "quantity": kwargs["quantity"],
                }
            )
            total_price += kwargs["price"] * kwargs["quantity"]

        self.check_products(products_by_type)

        return (items, total_price)

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


class ConfirmOrderStrategy(PaypalApiStrategy):
    def send_request(self, inputs) -> List[dict]:
        token_payload = {"grant_type": "client_credentials"}
        token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

        token = inputs["token"]
        username = inputs["username"]

        response = requests.get(
            f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}",
            auth=(CLIENT_ID, SECRET),
            headers=token_headers,
            data=token_payload,
        )

        if response.status_code != 200:
            raise ("There was an internal problem: ", response)

        response = response.json()
        if response["status"] == "APPROVED":
            items = response["purchase_units"][0]["items"]
            components_purchased = self.save_purchases(items, username)

        return components_purchased

    def save_purchases(
        self, items: List[dict], username: str
    ) -> List[ProductPurchaseType]:
        components_purchased = []

        user = User.objects.filter(username=username).first()
        if user is None:
            raise Exception(f"No user was found with the username {username}")

        for product in items:
            product_type = product["name"].split("-")[0]
            product_id = product["name"].split("-")[1]

            ComponentModel = components_mapping[product_type]
            component = ComponentModel.objects.filter(
                is_active=True, id=product_id
            ).first()

            if component is None:
                raise Exception(f"No {product_type} was found with the ID {product_id}")
            else:
                quantity = product["quantity"]
                ProductPurchase.objects.create(
                    component_type=product_type,
                    component_id=product_id,
                    user=user,
                    price=component.price,
                    quantity=quantity,
                )
                components_purchased.append(
                    ProductPurchaseType(
                        package=component.package,
                        component_name=component,
                        price=component.price,
                        quantity=quantity,
                        total_price=Decimal(quantity) * component.price,
                        mounting_technology=component.mounting_technology,
                    )
                )

        return components_purchased
