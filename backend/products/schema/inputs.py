import graphene
from products.schema.enums import (
    BJTTypesEnum,
    CapacitorTypesEnum,
    DiodeTypesEnum,
    InductorTypesEnum,
    ManufacturerEnum,
    MaterialCoreTypesEnum,
    MountingTechnologyEnum,
    TransistorTypesEnum,
)


class BaseInput(graphene.InputObjectType):
    model = graphene.String()
    mounting_technology = graphene.Field(MountingTechnologyEnum)
    manufacturer = graphene.Field(ManufacturerEnum)


class CapacitorInput(BaseInput):
    capacitor_type = graphene.Field(CapacitorTypesEnum)
    capacitance = graphene.Float()
    voltage = graphene.Float()


class DiodeInput(BaseInput):
    diode_type = graphene.Field(DiodeTypesEnum)
    dc_reverse = graphene.Float()
    current = graphene.Float()


class ResistorInput(BaseInput):
    resistance = graphene.Float()
    tolerance = graphene.Int()
    power = graphene.Float()


class InductorInput(BaseInput):
    inductor_type = graphene.Field(InductorTypesEnum)
    core_material = graphene.Field(MaterialCoreTypesEnum)
    inductance = graphene.Float()
    current = graphene.Float()


class BJTInput(graphene.InputObjectType):
    bjt_type = graphene.Field(BJTTypesEnum)
    ic_max = graphene.Float()
    dc_current_gain = graphene.Int()


class MOSFETInput(graphene.InputObjectType):
    vds = graphene.Float()
    drive_voltage = graphene.Float()
    rds_on = graphene.Float()


class IGBTInput(graphene.InputObjectType):
    vc = graphene.Float()
    ic = graphene.Float()
    power_max = graphene.Float()


class TransistorInput(BaseInput):
    transistor_type = graphene.Field(TransistorTypesEnum)
    bjt_input = graphene.Field(BJTInput)
    mosfet_input = graphene.Field(MOSFETInput)
    igbt_input = graphene.Field(IGBTInput)
