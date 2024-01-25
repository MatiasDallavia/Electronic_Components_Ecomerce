import graphene
from products.schema.products_queries import ProductListQuery
from purchases.schema.mutations import RegisterUserMutation, CreateOrderMutation, CaptureOrderMutation
import graphql_jwt


class Query(ProductListQuery):
    pass

class AuthMutation(graphene.ObjectType):
    login = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register_user = RegisterUserMutation.Field()
    create_order = CreateOrderMutation.Field()
    capture_order = CaptureOrderMutation.Field()

schema = graphene.Schema(query=Query, mutation=AuthMutation)