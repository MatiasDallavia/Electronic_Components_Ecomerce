from enum import Enum
from typing import List, Union

import graphene

from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.enums import BJTTypesEnum, TransistorTypesEnum
from products.schema.inputs import (
    CapacitorInput,
    ConponentModelListInput,
    DiodeInput,
    InductorInput,
    ResistorInput,
    TransistorInput,
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
from products.strategy_transistor import (
    ConcreteStrategyBJT,
    ConcreteStrategyIGBT,
    ConcreteStrategyMOSFET,
    TransistorQuery,
)


class ProductListQuery(graphene.ObjectType):
    capacitors_query = graphene.List(CapacitorType, inputs=CapacitorInput())
    diodes_query = graphene.List(DiodeType, inputs=DiodeInput())
    resistors_query = graphene.List(ResistorType, inputs=ResistorInput())
    inductors_query = graphene.List(InductorType, inputs=InductorInput())
    transistors_query = graphene.List(TransistorType, inputs=TransistorInput())

    def resolve_capacitors_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Capacitor.objects.filter(**filter_kwargs)

    def resolve_diodes_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Diode.objects.filter(**filter_kwargs)

    def resolve_resistors_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Resistor.objects.filter(**filter_kwargs)

    def resolve_inductors_query(self, info, inputs):
        filter_kwargs = clean_inputs(inputs)
        return Inductor.objects.filter(**filter_kwargs)

    def resolve_transistors_query(self, info, inputs):
        if inputs.transistor_type == "BJT":
            strategy = ConcreteStrategyBJT()
        if inputs.transistor_type == "MOSFET":
            strategy = ConcreteStrategyMOSFET()
        if inputs.transistor_type == "IGBT":
            strategy = ConcreteStrategyIGBT()

        filter_kwargs = clean_inputs(inputs)

        transistor_context = TransistorQuery(strategy)

        return transistor_context.execute(filter_kwargs)


def clean_inputs(inputs):
    """
    Cleans input parameters by removing empty filter values and extracs the  actual
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

        # for transistors_query
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
