import graphene
from graphene_django.types import DjangoObjectType
from products.enums import BJTTypesEnum
from products.schema.types import BJTType, MOSFETType

from ..models import BJT, MOSFET
from products.schema.enums import BJTPackagesOptionsEnum, ManufacturerEnum, MountingTechnologyEnum
from products.schema.queries import Query
class TransistorType(graphene.Union):
    class Meta:
        types = (BJTType, MOSFETType)


class BJTInput(graphene.InputObjectType):
    type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)


class PQuery(graphene.ObjectType):
    bjts = graphene.List(TransistorType, filters=BJTInput())

    def resolve_bjts(self, info, filters):
        bt = filters["bjt_type"]
        print(BJTTypesEnum("PNP"))
        print(ManufacturerEnum("INFINEON"))
        if filters["type"] == "BJT":
            bjts = [
                BJTType(
                    id=i.id,
                    model=i.model,
                    price=i.price,
                    description=i.description,
                    mounting_technology=i.mounting_technology,
                    operating_temperature=i.operating_temperature,
                    amount_available=i.amount_available,
                    manufacturer=i.manufacturer,
                    package=i.package,
                    bjt_type=i.bjt_type,
                    ic_max=i.ic_max,
                    vce_saturation=i.vce_saturation,
                    dc_current_gain=i.dc_current_gain

                )
                for i in BJT.objects.all()
            ]
            return bjts

        elif filters["type"] == "MOSFET":
            bjts = [
                MOSFETType(id=i.id, model=i.model, description=i.description)
                for i in MOSFET.objects.all()
            ]
            return bjts


schema = graphene.Schema(query=Query)
