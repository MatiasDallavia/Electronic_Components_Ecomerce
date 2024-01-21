import json
import os
from decimal import Decimal
from typing import List, Tuple

import requests
from dotenv import load_dotenv
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from purchases.models import ProductPurchase, User
from purchases.schema.types import ProductPurchaseType

components_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "RESISTOR": Resistor,
    "CAPACITOR": Capacitor,
    "INDUCTOR": Inductor,
    "DIODE": Diode,
}


load_dotenv()

CLIENT_ID = os.environ["CLIENT_ID"]
SECRET = os.environ["SECRET"]

base_url = "https://api-m.sandbox.paypal.com"


def make_paypal_payment(items: List[dict], total_price: int):
    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}
    token_response = requests.post(
        "https://api.sandbox.paypal.com/v1/oauth2/token",
        auth=(CLIENT_ID, SECRET),
        data=token_payload,
        headers=token_headers,
    )

    if token_response.status_code != 200:
        print(token_response.status_code)
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
    print(response)
    if response.get("name") == "INVALID_REQUEST":
        raise Exception(f"{response}")
    print(response)
    return response["links"][1]["href"]


def confirm_order(token: str, username) -> Tuple[bool, str, list]:
    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

    errors = []

    try:

        response = requests.get(
            f"https://api-m.sandbox.paypa.com/v2/checkout/orders/{token}",
            auth=(CLIENT_ID, SECRET),
            headers=token_headers,
            data=token_payload,
        )
        
        if response.status_code != 200:
            errors.append("There was an internal problem")

        response = response.json()    
        print("PROBLEMA")
        if response["status"] == "APPROVED":
            items = response["purchase_units"][0]["items"]
            components_purchased = save_purchases(items, username, errors)

        return components_purchased, errors

    except Exception as e:
        errors.append("An error ocurred")
        return None, errors


def save_purchases(
    items: list, username: str, errors: list
) -> List[ProductPurchaseType]:
    components_purchased = []

    user = User.objects.filter(username=username).first()
    if user is None:
        errors.append("No user was found with the username " + username)

    for product in items:

        product_type = product["name"].split("-")[0]
        product_id = product["name"].split("-")[1]

        ComponentModel = components_mapping[product_type]
        component = ComponentModel.objects.filter(id=product_id).first()

        if component is None:
            errors.append(f"No {product_type} was found with the ID {product_id}")
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
