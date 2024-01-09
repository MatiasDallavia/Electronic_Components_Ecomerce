import graphene
from products.schema.enums import (
    TransistorTypesEnum,
    BJTTypesEnum,
    ManufacturerEnum

)

class BJTInput(graphene.InputObjectType):
    manufacturer = graphene.Field(ManufacturerEnum)
    bjt_type = graphene.Field(BJTTypesEnum)
    ic_max = graphene.Float()
    vce_saturation = graphene.Float()
    dc_current_gain = graphene.Int()


class MOSFETInput(graphene.InputObjectType):
    manufacturer = graphene.Field(ManufacturerEnum)
    vds = graphene.Float()
    drive_voltage = graphene.Float()
    rds_on = graphene.Float()


class IGBTInput(graphene.InputObjectType):
    manufacturer = graphene.Field(ManufacturerEnum)
    vc = graphene.Float()
    ic = graphene.Float()
    power_max = graphene.Float()

class TransistorInput(graphene.InputObjectType):
    transistor_type = graphene.Field(TransistorTypesEnum)
    bjt_input= graphene.Field(BJTInput)
    mosfet_input = graphene.Field(MOSFETInput)
    igbt_input = graphene.Field(IGBTInput)
