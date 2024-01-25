from typing import List

from purchases.paypal.confirm_order import OrderConfirmationHandler
from purchases.paypal.create_order import OrderCreationHandler
from purchases.schema.types import ProductPurchaseType


class PaypalPurchaseFacade:
    _inputs: dict

    def __init__(self, inputs: dict):
        self._inputs = inputs

    def create_order(self) -> str:
        products_to_purchase = self._inputs["products_to_purchase"]
        handler = OrderCreationHandler()
        items, total_price = handler.proccess_data(products_to_purchase)
        payment_url = handler.send_request(items=items, total_price=total_price)

        return payment_url

    def confirm_order(self) -> List[ProductPurchaseType]:
        username = self._inputs["username"]
        token = self._inputs["token"]

        handler = OrderConfirmationHandler()
        user = handler.get_user(username)
        response = handler.send_request(token)
        items = response["purchase_units"][0]["items"]

        components_purchased = handler.save_purchases(user, items)

        return components_purchased
