import graphene

class ResponseOrderType(graphene.ObjectType):
    errors = graphene.List(graphene.String)
    url = graphene.String()