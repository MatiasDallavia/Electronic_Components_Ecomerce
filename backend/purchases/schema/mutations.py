from typing import Union

import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from graphene import Mutation
from graphql_jwt.decorators import login_required
from purchases.models import ProductPurchase
from purchases.paypal_functions import confirm_order, make_paypal_payment
from purchases.schema.types import ResponseOrderType, UserType, ProductPurchaseType
from purchases.schema.inputs import CreateOrderInput
from purchases.schema.types import ResponseOrderType

from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor

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
    class Arguments:
        inputs = graphene.Argument(CreateOrderInput)

    errors = graphene.List(graphene.String)
    url = graphene.String()

    def mutate(self, info, inputs):
        try:
            products_kwargs = inputs["products_to_purchase"]
            products_by_type = {}
            items = []
            total_price = 0

            for kwargs in products_kwargs:
                component_type = kwargs["component_type"].name
                component_id = kwargs["component_id"]
            
                #stores all component IDs based on their type
                if component_type in products_by_type:
                    products_by_type[component_type].append(int(component_id))
                else:
                    products_by_type[component_type] = [int(component_id)]                    

                item_reference = (
                    component_type + "-" + component_id
                )

                items.append(
                    {
                        "name": item_reference,
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": kwargs["price"]
                        },
                        "quantity": kwargs["quantity"]
                    }
                )
                total_price += kwargs["price"] * kwargs["quantity"]

            errors = check_products(products_by_type)
            if errors:
                return CreateOrderMutation(errors=errors, url=None)
            print("123")
            url = make_paypal_payment(items, total_price)
            return CreateOrderMutation(errors=errors, url=url)
        except Exception as e:
            errors = ["An internal error occured"]
            return CreateOrderMutation(ResponseOrderType(errors=errors, url=""))


class CaptureOrderMutation(Mutation):
    class Arguments:
        token = graphene.String()
        username = graphene.String()

    errors = graphene.List(graphene.String)
    purchases = graphene.List(ProductPurchaseType)

    def mutate(self, info, token, username):

        purchases, errors = confirm_order(token, username)

        if errors:
            return CaptureOrderMutation(errors=errors, purchases=None)
        return CaptureOrderMutation(errors=[], purchases=purchases)


def check_products(products_by_type: list) -> list:
    errors = []
    for product_type, id_list in products_by_type.items():
        ComponentModel = components_mapping[product_type]
        products = ComponentModel.objects.filter(is_active=True)
        l =  list(products.values_list("id", flat=True))

        if all(
            id in list(products.values_list("id", flat=True))
            for id in id_list
        ):
            errors.append(f"A non-existing {product_type} was given")


    return errors            