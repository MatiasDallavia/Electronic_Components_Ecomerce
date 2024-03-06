import graphene
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType

from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.types import (
    BJTType,
    CapacitorType,
    DiodeType,
    IGBTType,
    InductorType,
    MOSFETType,
    ResistorType,
    check_ohm_notation,
)


class ComponentUnionType(graphene.Union):
    class Meta:
        types = (
            BJTType,
            MOSFETType,
            IGBTType,
            DiodeType,
            InductorType,
            ResistorType,
            CapacitorType,
        )


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ('password',)


class ProductPurchaseType(graphene.ObjectType):
    component_node = graphene.Field(ComponentUnionType)
    quantity = graphene.Int()
    purchase_date = graphene.String()

