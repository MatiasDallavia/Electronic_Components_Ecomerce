import graphene
from products.schema.list_product_queries import ProductListQuery
from purchases.mutations import RegisterUserMutation
import graphql_jwt


class Query(ProductListQuery):
    pass

class AuthMutation(graphene.ObjectType):
    login = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register_user = RegisterUserMutation.Field()

schema = graphene.Schema(query=Query, mutation=AuthMutation)