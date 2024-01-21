import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from graphene import Mutation
from graphene_django import DjangoObjectType
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from purchases.schema.inputs import CreateOrderInput
from purchases.schema.types import ResponseOrderType
from django.apps import apps
from purchases.models import ProductPurchase
from purchases.paypal_functions import make_paypal_payment


class UserType(DjangoObjectType):
    class Meta:
        model = User


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
        inputs =graphene.Argument(CreateOrderInput)

    errors = graphene.String()
    url = graphene.String()

    def mutate(self, info, inputs):
        try:
            products_kwargs = inputs["products_to_purchase"]
            user_name = inputs["user_name"]
            purchase_units = []
            print("--------------")
            for kwargs in products_kwargs:
                print("1")
                refernce_id = kwargs["component_type"].value + "-" + kwargs["component_id"]
                purchase_units.append({
                    "reference_id": refernce_id,
                    "amount": {"currency_code": "USD", "value": kwargs["price"]},
                    }
                )
                print(2)
            url = make_paypal_payment(purchase_units)
            return CreateOrderMutation(errors="",url=url)
        except Exception as e:
            return CreateOrderMutation(ResponseOrderType(errors=e, url=""))