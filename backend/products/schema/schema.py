import graphene
from graphene_django.types import DjangoObjectType
from products.schema.types import BJTType, MOSFETType

from ..models import BJT, MOSFET
from products.schema.enums import BJTPackagesOptionsEnum, ManufacturerEnum, MountingTechnologyEnum
from products.schema.queries import ProductListQuery

class Query(ProductListQuery):
    pass

schema = graphene.Schema(query=Query)
