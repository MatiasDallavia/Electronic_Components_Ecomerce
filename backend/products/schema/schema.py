import graphene
from graphene_django.types import DjangoObjectType

from products.types import BJTType, MOSFETType
from ..models import BJT, MOSFET


from products.enums import BJTTypesEnum


class TransistorType(graphene.Union):
    class Meta:
        types = (BJTType, MOSFETType)


class BJTInput(graphene.InputObjectType):
    type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)


class Query(graphene.ObjectType):
    bjts = graphene.List(TransistorType, filters=BJTInput())

    def resolve_bjts(self, info, filters):
        bt = filters["bjt_type"]
        print(BJTTypesEnum.get("PNP"))
        if filters["type"] == "BJT":
            bjts = [
                BJTType(id=i.id,model=i.model,bjt_type=BJTTypesEnum.get(i.bjt_type))
                for i in BJT.objects.all()
                ]
            return bjts

        elif filters["type"] == "MOSFET":
            bjts = [
                MOSFETType(id=i.id,model=i.model, description=i.description)
                for i in MOSFET.objects.all()
                ]
            return bjts



schema = graphene.Schema(query=Query)
