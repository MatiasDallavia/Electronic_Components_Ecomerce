import json
import os
from typing import List, Tuple

import requests
from dotenv import load_dotenv

from products.models import (
    BJT, MOSFET, IGBT, Diode, Inductor, Capacitor, Resistor
)
from purchases.models import User, ProductPurchase
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


def make_paypal_payment(purchase_units: List[dict]):
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
        raise Exception(f"{response}")
    print(response)
    return response["links"][1]["href"]

def confirm_order(token: str, username) -> Tuple[bool, str, list]:
    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

    errors = []
    components_purchased = []



    response = requests.get(
        f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}",
        auth=(CLIENT_ID, SECRET),
        headers=token_headers,
        data=token_payload,
    ).json()
    print("------------------------")
    if response["status"] == "APPROVED":
        print(1)
        user = User.objects.filter(username=username).first()
        if user is None:
            errors.append("No user was found with the username " + username)

        for product in response["purchase_units"]:
            product_type = product["reference_id"].split("-")[0]
            product_id  = product["reference_id"].split("-")[1]            


            ComponentModel = components_mapping[product_type] 
            component = ComponentModel.objects.filter(id=product_id).first()
            
            if component is None:
                errors.append(f"No {product_type} was found with the ID {product_id}")
            else:
                ProductPurchase.objects.create(
                    component_type = product_type,
                    component_id = product_id,
                    user = user,
                    price = component.price,
                    quantity=1,
                ) 
                components_purchased.append(
                    ProductPurchaseType(
                        package=component.package ,    
                        component_name=component,     
                        price=component.price,
                        mounting_technology=component.mounting_technology        
                        )
                    )
                                     

    return components_purchased, errors
