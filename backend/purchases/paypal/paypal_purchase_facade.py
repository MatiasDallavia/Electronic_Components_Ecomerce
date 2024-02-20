import logging
from typing import List

from graphql import GraphQLError
from purchases.paypal.confirm_order import OrderConfirmationHandler
from purchases.paypal.create_order import OrderCreationHandler
from purchases.schema.types import ProductPurchaseType

logger = logging.getLogger(__name__)


class PaypalPurchaseFacade:
    """
    Facade class for handling PayPal purchases, including order creation and confirmation.
    """

    _inputs: dict

    def __init__(self, inputs: dict):
        """
        Initializes the PaypalPurchaseFacade with input data.

        Args:
            inputs (dict): Dictionary containing input data.
        """
        self._inputs = inputs

    def create_order(self) -> str:
        """
        Creates a PayPal order and returns the payment URL.

        Returns:
            str: PayPal payment URL.
        """
        products_to_purchase = self._inputs["products_to_purchase"]
        handler = OrderCreationHandler()
        items, total_price = handler.proccess_data(products_to_purchase)
        payment_url = handler.send_request(items=items, total_price=total_price)

        return payment_url

    def confirm_order(self) -> List[ProductPurchaseType]:
        """
        Confirms a PayPal order and saves purchase information.

        Returns:
            List[ProductPurchaseType]: List of purchased product.
        """
        username = self._inputs["username"]
        token = self._inputs["token"]

        handler = OrderConfirmationHandler()
        user = handler.get_user(username)
        response = handler.send_request(token)
        items = response["purchase_units"][0]["items"]

        components_purchased = handler.save_purchases(user, items)

        return components_purchased
