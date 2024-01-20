import json

import requests

client_id = (
    "AfMCdKYoHcn7QafF0_Lsn9NGZjwKuhyxU_u2psCbTPI9exTgp8kognEUhb6PDvIrtZXpNMmRsd5TLNTQ"
)
secret = (
    "EKgl7mmYRPnpjHDkSN9AGAhiag6GmirgmiFIX3faQXwd5Q9USDOp50u0tFWXBYrJhsxqxWhEglFkOXYB"
)
url = "https://api-m.sandbox.paypal.com"


def make_paypal_payment():
    # Set up PayPal API credentials

    # Set up API endpoints
    base_url = url
    token_url = base_url + "/v1/oauth2/token"

    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}
    token_response = requests.post(
        "https://api.sandbox.paypal.com/v1/oauth2/token",
        auth=(client_id, secret),
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
        "purchase_units": [
            {
                "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
                "amount": {"currency_code": "USD", "value": "100.00"},
            }
        ],
        "payment_source": {
            "paypal": {
                "experience_context": {
                    "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                    "brand_name": "EXAMPLE INC",
                    "locale": "en-US",
                    "landing_page": "LOGIN",
                    "user_action": "PAY_NOW",
                    "return_url": "https://example.com/returnUrl",
                    "cancel_url": "https://example.com/cancelUrl",
                }
            }
        },
    }

    response = requests.post(
        f"{base_url}/v2/checkout/orders", headers=headers, data=json.dumps(data)
    )

    return response.json()["links"][1]["href"], response.json()["links"][0]["href"]


def confirm_order(token):

    token_payload = {"grant_type": "client_credentials"}
    token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

    response = requests.get(
        f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}",
        auth=(client_id, secret),
        headers=token_headers,
        data=token_payload,
    )

    print(response.json())
