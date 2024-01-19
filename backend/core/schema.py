import graphene
from products.schema.list_product_queries import ProductListQuery
from purchases.mutations import RegisterUserMutation

class Query(ProductListQuery):
    pass

class AuthMutation(graphene.ObjectType):
    register_user = RegisterUserMutation.Field()

schema = graphene.Schema(query=Query, mutation=AuthMutation)