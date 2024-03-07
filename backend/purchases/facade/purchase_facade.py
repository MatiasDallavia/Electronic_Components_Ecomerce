import logging
from typing import List

from purchases.facade.paypal.confirm_order import OrderConfirmationHandler
from purchases.facade.paypal.create_order import OrderCreationHandler
from purchases.facade.user_purchases import UserPurchasesHandler
from purchases.schema.types import ProductPurchaseType

logger = logging.getLogger(__name__)


class PaypalPurchaseFacade:
    """
    Facade class for handling PayPal purchases, including order creation and confirmation.
    """

    _inputs: dict
    _user: str

    def __init__(self, inputs: dict = None, user: str = None):
        """
        Initializes the PaypalPurchaseFacade with input data.

        Args:
            inputs (dict): Dictionary containing input data.
        """
        self._inputs = inputs
        self._user = user

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
        token = self._inputs["token"]

        handler = OrderConfirmationHandler()
        user = handler.get_user(self._user)
        response = handler.send_request(token)
        items = response["purchase_units"][0]["items"]

        components_purchased = handler.save_purchases(user, items)

        return components_purchased

    def get_user_purchase_history(self) -> List[ProductPurchaseType]:

        handler = UserPurchasesHandler()
        raw_purchases_data = handler.retrvie_purchases_from_user(self._user)

        logger.debug(
            "// User's purchases by component (ID): \n%s",
            "\n".join(
                [
                    f"{component_type}: {values[1]}"
                    for component_type, values in raw_purchases_data.items()
                ]
            ),
        )

        purchased_components = handler.convert_products_to_nodes(raw_purchases_data)
        sorted_purchases = sorted(
            purchased_components, key=lambda x: x.purchase_date, reverse=True
        )

        return sorted_purchases
