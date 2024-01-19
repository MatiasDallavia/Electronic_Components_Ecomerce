import graphene
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType
from graphene import Mutation

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
       

class AuthMutation(graphene.ObjectType):
    register_user = RegisterUserMutation.Field()


