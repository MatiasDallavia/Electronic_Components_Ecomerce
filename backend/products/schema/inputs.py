import graphene
from products.enums import BJTTypesEnum

class BJTInput(graphene.InputObjectType):
    bjt_type = graphene.Field(BJTTypesEnum)


class MOSFETInput(graphene.InputObjectType):
    transitor_type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)


class IGBTInput(graphene.InputObjectType):
    transitor_type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)

class TransistorInput(BJTInput):
    transistorType = graphene.String()
