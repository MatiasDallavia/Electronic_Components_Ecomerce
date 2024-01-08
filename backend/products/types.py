import graphene
from graphene_django.types import DjangoObjectType

from products.models import (
    BJT,
    MOSFET,
    IGBT,
    Capacitor,
    Diode,
    Resistor,
    Inductor,

)

from products.enums import (
    BJTPackagesOptionsEnum,
    BJTTypesEnum,
    MOSFETPackagesOptionsEnum,
    IGBTPackagesOptionsEnum,
    MountingTechnologyEnum,
    ManufacturerEnum
)


class CapacitorType(DjangoObjectType):
    class Meta:
        model = Capacitor
        fields = "__all__"

class ResistorType(DjangoObjectType):
    class Meta:
        model = Resistor
        fields = "__all__"


class DiodeType(DjangoObjectType):
    class Meta:
        model = Diode
        fields = "__all__"


class InductorType(DjangoObjectType):
    class Meta:
        model = Inductor
        fields = "__all__"


class BaseProductModelType(graphene.ObjectType):
    id = graphene.ID()
    product_id = graphene.UUID()
    model = graphene.String()
    description = graphene.String()
    price = graphene.Float()
    mounting_technology = graphene.Field(MountingTechnologyEnum)
    operating_temperature = graphene.Float()
    amount_available = graphene.Int()
    manufacturer = graphene.Field(ManufacturerEnum)
    is_active = graphene.Boolean()


class BJTType(BaseProductModelType):
    package = graphene.Field(BJTPackagesOptionsEnum)
    bjt_type = graphene.Field(BJTTypesEnum)
    ic_max = graphene.Float(required=True)
    vce_saturation = graphene.Float(required=True)
    dc_current_gain = graphene.Float(required=True)



class MOSFETType(BaseProductModelType):
    package = graphene.Field(MOSFETPackagesOptionsEnum)
    vds = graphene.Float()
    drive_voltage = graphene.Float()
    rds_on = graphene.Float()
    vgs = graphene.Float()
    input_capacitance = graphene.Float()


class IGBTType(BaseProductModelType):
    package = graphene.Field(IGBTPackagesOptionsEnum)
    vc = graphene.Float()
    ic = graphene.Float()
    vce_on = graphene.Float()
    power_max = graphene.Float()
    td = graphene.Float()
    gc = graphene.Float()



class TransistorType(graphene.Union):
    class Meta:
        types = (BJTType, MOSFETType, IGBT)


class BJTInput(graphene.InputObjectType):
    type = graphene.String()