import graphene
from django.contrib.auth.models import User
from graphene import Mutation
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from purchases.schema.inputs import ConfirmOrderInput, CreateOrderInput
from purchases.schema.types import ProductPurchaseType, UserType

components_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "RESISTOR": Resistor,
    "CAPACITOR": Capacitor,
    "INDUCTOR": Inductor,
    "DIODE": Diode,
}

from purchases.purchase_strategy import (
    ConfirmOrderStrategy,
    CreateOrderStrategy,
    PurchaseContext,
)


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

    errors = graphene.String()
    url = graphene.String()

    def mutate(self, info, inputs):
        try:
            context = PurchaseContext(CreateOrderStrategy())
            url = context.execute_strategy(inputs)
            return CreateOrderMutation(errors="", url=url)
        except Exception as e:
            return CreateOrderMutation(errors=e, url=None)


class CaptureOrderMutation(Mutation):
    """
    Mutation for confirming payment orders and creating ProductPurchaseType.
    """

    class Arguments:
        inputs = ConfirmOrderInput(required=True)

    errors = graphene.String()
    purchases = graphene.List(ProductPurchaseType)

    def mutate(self, info, inputs):
        try:
            context = PurchaseContext(ConfirmOrderStrategy())
            components_purchased = context.execute_strategy(inputs)
            return CaptureOrderMutation(errors="", purchases=components_purchased)
        except Exception as e:
            return CaptureOrderMutation(errors=e, purchases=None)
