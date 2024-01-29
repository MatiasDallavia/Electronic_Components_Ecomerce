import logging

import graphene
from django.contrib.auth.models import User
from graphene import Mutation
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from purchases.paypal.paypal_purchase_facade import PaypalPurchaseFacade
from purchases.schema.inputs import ConfirmOrderInput, CreateOrderInput
from purchases.schema.types import ProductPurchaseType, UserType

logger = logging.getLogger(__name__)


components_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "RESISTOR": Resistor,
    "CAPACITOR": Capacitor,
    "INDUCTOR": Inductor,
    "DIODE": Diode,
}


class RegisterUserMutation(Mutation):
    """
    Mutation for the creation of User.
    """

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, username, email, password):
        logger.info("## Starting Register Mutation.")
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return RegisterUserMutation(user=user)


class CreateOrderMutation(Mutation):
    """
    Mutation for creating orders of payments.
    """

    class Arguments:
        inputs = CreateOrderInput(required=True)

    url = graphene.String()

    @login_required
    def mutate(self, info, inputs):
        logger.info("#" * 10 + " Starting CreateOrder Mutation." + "#" * 10)
        logger.debug("Input Fields: %s", inputs)
        try:
            purchase_facede = PaypalPurchaseFacade(inputs)
            url = purchase_facede.create_order()
            return CreateOrderMutation(url=url)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")


class CaptureOrderMutation(Mutation):
    """
    Mutation for confirming payment orders and creating ProductPurchaseType.
    """

    class Arguments:
        inputs = ConfirmOrderInput(required=True)

    purchases = graphene.List(ProductPurchaseType)

    @login_required
    def mutate(self, info, inputs):
        logger.info("#" * 10 + " Starting CaptureOrder Mutation." + "#" * 10)
        logger.debug("Input Fields: %s", inputs)
        try:
            purchase_facede = PaypalPurchaseFacade(inputs)
            components_purchased = purchase_facede.confirm_order()
            return CaptureOrderMutation(purchases=components_purchased)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")
