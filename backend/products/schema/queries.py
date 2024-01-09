import graphene
from products.enums import BJTTypesEnum
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.enums import (
    BJTPackagesOptionsEnum,
    ManufacturerEnum,
    MountingTechnologyEnum,
)
from products.schema.types import BJTType, IGBTType, MOSFETType, TransistorType

from products.schema.inputs import TransistorInput

class BJTInput(graphene.InputObjectType):
    type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)


class Query(graphene.ObjectType):
    transistor_list_query = graphene.List(TransistorType, inputs=TransistorInput())

    def resolve_transistor_list_query(self, info, inputs):
        transistor_type = inputs["transistorType"]
        #mounting_technology = inputs["mountingTechnology"]
        #manufacturer = inputs["manufacturer"]

        if transistor_type == "BJT":
            transistors = [
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
                    dc_current_gain=i.dc_current_gain,
                )
                for i in BJT.objects.all()
            ]

        elif transistor_type == "MOSFET":
            transistors = [
                MOSFETType(
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
                    dc_current_gain=i.dc_current_gain,
                )
                for i in BJT.objects.all()
            ]
        elif transistor_type == "MOSFET":
            transistors = [
                IGBT(
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
                    dc_current_gain=i.dc_current_gain,
                )
                for i in BJT.objects.all()
            ]    
        return transistors
