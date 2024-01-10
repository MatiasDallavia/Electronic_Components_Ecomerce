from enum import Enum
from typing import List, Union

import graphene
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.enums import BJTTypesEnum, TransistorTypesEnum
from products.schema.inputs import (
    CapacitorInput,
    DiodeInput,
    InductorInput,
    ResistorInput,
    TransistorInput,
    ConponentModelListInput,
)
from products.schema.types import (
    BJTType,
    CapacitorType,
    DiodeType,
    IGBTType,
    InductorType,
    MOSFETType,
    ResistorType,
    TransistorType,
)


class BJTInput(graphene.InputObjectType):
    type = graphene.String()
    bjt_type = graphene.Field(BJTTypesEnum)


class ProductListQuery(graphene.ObjectType):
    capacitor_list_query = graphene.List(CapacitorType, inputs=CapacitorInput())
    diode_list_query = graphene.List(DiodeType, inputs=DiodeInput())
    resistor_list_query = graphene.List(ResistorType, inputs=ResistorInput())
    inductor_list_query = graphene.List(InductorType, inputs=InductorInput())
    transistor_list_query = graphene.List(TransistorType, inputs=TransistorInput())
    model_list_query = graphene.List(graphene.String, inputs=ConponentModelListInput())

    def resolve_capacitor_list_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Capacitor.objects.filter(**filter_kwargs)

    def resolve_diode_list_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Diode.objects.filter(**filter_kwargs)

    def resolve_resistor_list_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Resistor.objects.filter(**filter_kwargs)

    def resolve_inductor_list_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Inductor.objects.filter(**filter_kwargs)

    def resolve_transistor_list_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        transistors = query_transistor_list(filter_kwargs)

        return transistors

    def resolve_model_list_query(self, info, inputs):
        models_list = query_component_model_list(inputs)
        return models_list

def clean_inputs(inputs):
    """
    Clean input parameters by removing empty filter values and extracs the  actual
    values from the Enums objets.

    Args:
        inputs (dict): Dictionary with input parameters from the queries.

    Returns:
        dict: dict with all the fields to filter the query to the db.
    """
    filter_kwargs = {}

    for input_field, field_value in inputs.items():
        if field_value is None:
            continue

        if isinstance(field_value, Enum):
            filter_kwargs[input_field] = field_value.value

        # for transistor_list_query
        elif input_field in ["bjt_input", "mosfet_input", "igbt_input"]:
            for transistor_field, transistor_field_value in field_value.items():
                if transistor_field_value is None:
                    continue
                if isinstance(transistor_field_value, Enum):
                    filter_kwargs[transistor_field] = transistor_field_value.value
                else:
                    filter_kwargs[transistor_field] = transistor_field_value

        elif input_field == "model":
            field_value = field_value.upper()
            filter_kwargs[f"{input_field}__startswith"] = field_value

        else:
            filter_kwargs[input_field] = field_value

    return filter_kwargs


def query_transistor_list(
    filter_kwargs: dict,
) -> List[Union[BJTType, MOSFETType, IGBTType]]:
    """
    Perform a query to get the list of transistors with the provided filters. It will query either
    BJT, MOSFET, IGBT or all of them based in the field 'transistor_type'

    Args:
        filter_kwargs (dict): Dictionary with filters for the query.

    Returns:
        List[Union[BJTType, MOSFETType, IGBTType]: List of of either: BJTType , MOSFETType, IGBTType.
    """
    transistor_type = filter_kwargs.pop("transistor_type")
    transistors = []

    if (
        transistor_type == TransistorTypesEnum.BJT
        or transistor_type == TransistorTypesEnum.ALL
    ):
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
            for obj in BJT.objects.filter(is_active=True, **filter_kwargs)
        ]
        transistors += bjts

    if (
        transistor_type == TransistorTypesEnum.MOSFET
        or transistor_type == TransistorTypesEnum.ALL
    ):
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
            for obj in MOSFET.objects.filter(is_active=True, **filter_kwargs)
        ]
        transistors += mosfets

    if (
        transistor_type == TransistorTypesEnum.IGBT
        or transistor_type == TransistorTypesEnum.ALL
    ):
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
            for obj in IGBT.objects.filter(is_active=True, **filter_kwargs)
        ]
        transistors += igbts

    return transistors


def query_component_model_list(inputs) -> List[str]:
    component_type = inputs["component_type"].value
    component_model = inputs["component_model"]

    from django.apps import apps

    Component = apps.get_model(app_label='products', model_name=component_type)
    models = Component.objects.filter(model__startswith=component_model).values_list("model", flat=True)
    print(models)
    return models
