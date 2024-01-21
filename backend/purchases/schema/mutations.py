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

    errors = graphene.String()
    url = graphene.String()

    def mutate(self, info, inputs):
        try:
            products_kwargs = inputs["products_to_purchase"]
            items = []
            total_price = 0
            for kwargs in products_kwargs:
                item_reference = (
                    kwargs["component_type"].name + "-" + kwargs["component_id"]
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
            print(items, total_price)
            url = make_paypal_payment(items, total_price)
            return CreateOrderMutation(errors="", url=url)
        except Exception as e:
            return CreateOrderMutation(ResponseOrderType(errors=e, url=""))


class CaptureOrderMutation(Mutation):
    class Arguments:
        token = graphene.String()
        username = graphene.String()

    errors = graphene.List(graphene.String)
    purchases = graphene.List(ProductPurchaseType)

    def mutate(self, info, token, username):
        print("-----")
        purchases, errors = confirm_order(token, username)
        print(purchases, errors)

        if errors:
            return CaptureOrderMutation(errors=errors, purchases=None)
        return CaptureOrderMutation(errors=[], purchases=purchases)

