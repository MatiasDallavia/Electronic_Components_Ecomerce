import graphene
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.enums import BJTTypesEnum, TransistorTypesEnum
from products.schema.inputs import TransistorInput
from products.schema.types import (
    BJTType,
    CapacitorType,
    DjangoObjectType,
    IGBTType,
    InductorType,
    MOSFETType,
    ResistorType,
    TransistorType,
    DiodeType
)


class BJTInput(graphene.InputObjectType):
    type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)


class Query(graphene.ObjectType):
    transistor_list_query = graphene.List(TransistorType, inputs=TransistorInput())
    capacitor_list_query = graphene.List(CapacitorType, inputs=TransistorInput())
    diode_list_query = graphene.List(DiodeType, inputs=TransistorInput())
    resistor_list_query = graphene.List(ResistorType, inputs=TransistorInput())
    inductor_list_query = graphene.List(InductorType, inputs=TransistorInput())

    def resolve_transistor_list_query(self, info, inputs):
        transistor_type = inputs["transistor_type"]

        transistors = query_transistor_list(transistor_type, inputs)

        print("--")
        # print(transistors)
        return transistors

    def resolve_capacitor_list_query(self, info, inputs):
        return Capacitor.objects.all()

    def resolve_diode_list_query(self, info, inputs):
        return Diode.objects.all()

    def resolve_resistor_list_query(self, info, inputs):
        return Resistor.objects.all()

    def resolve_inductor_list_query(self, info, inputs):
        return Inductor.objects.all()


def query_transistor_list(transistor_type: str, inputs: dict):
    transistors = []

    if (
        transistor_type == TransistorTypesEnum.BJT
        or transistor_type == TransistorTypesEnum.ALL
    ):
        filter_fields = clean_filter_kwargs(inputs["bjt_input"])

        bjts = [
            BJTType(
                id=obj.id,
                model=obj.model,
                price=obj.price,
                description=obj.description,
                mounting_technology=obj.mounting_technology,
                operating_temperature=obj.operating_temperature,
                amount_available=obj.amount_available,
                manufacturer=obj.manufacturer,
                package=obj.package,
                bjt_type=obj.bjt_type,
                ic_max=obj.ic_max,
                vce_saturation=obj.vce_saturation,
                dc_current_gain=obj.dc_current_gain,
            )
            for obj in BJT.objects.filter(is_active=True, **filter_fields)
        ]
        transistors += bjts

    if (
        transistor_type == TransistorTypesEnum.MOSFET
        or transistor_type == TransistorTypesEnum.ALL
    ):
        filter_fields = clean_filter_kwargs(inputs["mosfet_input"])

        mosfets = [
            MOSFETType(
                id=obj.id,
                product_id=obj.product_id,
                model=obj.model,
                description=obj.description,
                price=obj.price,
                mounting_technology=obj.mounting_technology,
                operating_temperature=obj.operating_temperature,
                amount_available=obj.amount_available,
                manufacturer=obj.manufacturer,
                package=obj.package,
                vds=obj.vds,
                drive_voltage=obj.drive_voltage,
                rds_on=obj.rds_on,
                vgs=obj.vgs,
                input_capacitance=obj.input_capacitance,
            )
            for obj in MOSFET.objects.filter(is_active=True, **filter_fields)
        ]
        transistors += mosfets
    print("-------")
    if (
        transistor_type == TransistorTypesEnum.IGBT
        or transistor_type == TransistorTypesEnum.ALL
    ):
        print("ooo")
        filter_fields = clean_filter_kwargs(inputs["igbt_input"])

        igbts = [
            IGBTType(
                id=obj.id,
                model=obj.model,
                description=obj.description,
                price=obj.price,
                mounting_technology=obj.mounting_technology,
                operating_temperature=obj.operating_temperature,
                amount_available=obj.amount_available,
                manufacturer=obj.manufacturer,
                package=obj.package,
                vc=obj.vc,
                ic=obj.ic,
                vce_on=obj.vce_on,
                power_max=obj.power_max,
                td=obj.td,
                gc=obj.gc,
            )
            for obj in IGBT.objects.filter(is_active=True, **filter_fields)
        ]
        transistors += igbts

    return transistors


def clean_filter_kwargs(input_fields: dict) -> dict:
    filter_fields = {field: value for field, value in input_fields.items() if value}
    if "manufacturer" in filter_fields:
        filter_fields["manufacturer"] = filter_fields["manufacturer"].value

    return filter_fields
