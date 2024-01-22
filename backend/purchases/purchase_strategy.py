import json
import os
from abc import ABC, abstractmethod
from typing import List, Tuple

import requests
from dotenv import load_dotenv
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor

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
    def proccess_data(self):
        pass

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
        data = self.strategy.proccess_data(inputs)
        return self.strategy.send_request(data)


class CreateOrderStrategy(PaypalApiStrategy):
    def proccess_data(self, inputs) -> Tuple[List[dict], float]:
        products_kwargs = inputs["products_to_purchase"]
        products_by_type = {}
        items = []
        total_price = 0
        print("proccess")
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


    def send_request(self, data) -> str:
        items, total_price = data

        token_payload = {"grant_type": "client_credentials"}
        token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}
        token_response = requests.post(
            "https://api.sandbox.paypal.com/v1/oauth2/token",
            auth=(CLIENT_ID, SECRET),
            data=token_payload,
            headers=token_headers,
        )

        if token_response.status_code != 200:
            return False, "Failed to authenticate with PayPal API", None

        access_token = token_response.json()["access_token"]

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        }

        purchase_units = [
            {
                "reference_id": "PUHF",
                "custom_id": "Something7364",
                "soft_descriptor": "Great description 1",
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

    # checks if the products given to purchase exist
    def check_products(self, products_by_type):
        errors = []

        for product_type, id_list in products_by_type.items():
            ComponentModel = components_mapping[product_type]
            products = ComponentModel.objects.filter(is_active=True)

            if all(id in list(products.values_list("id", flat=True)) for id in id_list):
                errors.append(f"A non-existing {product_type} was given")

        if errors:
            raise Exception(f"{errors}")

    