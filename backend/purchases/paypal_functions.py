import json
import os
from typing import List, Tuple

import requests
from dotenv import load_dotenv

from products.models import (
    BJT, MOSFET, IGBT, Diode, Inductor, Capacitor, Resistor
)

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

    return response["links"][1]["href"]
[{'reference_id': 'Diode-23', 
  'amount': {
      'currency_code': 'USD', 'value': '10.00'}, 
      'payee': 
        {'email_address': 'sb-ebd8z28937190@business.example.com',
          'merchant_id': 'XRBZRBXZ28G62',
            'display_data': {'brand_name': 'Electronic Component Ecomerce'}},
              'shipping': {
                  'name': {'full_name': 'John Doe'},
                    'address': {'address_line_1': '1 Main St', 'admin_area_2': 'San Jose', 'admin_area_1': 'CA', 'postal_code': '95131', 'country_code': 'US'}}}]

def confirm_order(token: str) -> Tuple[bool, str]:
    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

    response = requests.get(
        f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}",
        auth=(CLIENT_ID, SECRET),
        headers=token_headers,
        data=token_payload,
    ).json()

    if response["status"] == "APPROVED":
        products = [
            [product["reference_id"].split("-")[0], product["reference_id"].split("-")[1]]    
            for product in response["purchase_units"]
            ]
        
        for product in products:
            product_type = product[0]
            product_id  = product[1]
            ComponentModel = components_mapping[product_type] 
            component = ComponentModel.objects.filter(id=product_id)
            print(component)

        return True, response
    return False, response
