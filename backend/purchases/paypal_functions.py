import json
import os
from typing import List

import requests
from dotenv import load_dotenv

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

    if status := response.get("name") == "INVALID_REQUEST":
        raise Exception(f"{response}")

    return response["links"][1]["href"]


def confirm_order(token: str) -> bool:
    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

    response = requests.get(
        f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}",
        auth=(CLIENT_ID, SECRET),
        headers=token_headers,
        data=token_payload,
    ).json()

    if response["status"] == "APPROVED":
        return True
    return False
