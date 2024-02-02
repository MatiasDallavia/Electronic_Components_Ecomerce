import logging
from enum import Enum

import graphene
from graphql import GraphQLError

from products.models import Capacitor, Diode, Inductor, Resistor
from products.schema.inputs import (
    CapacitorInput,
    DiodeInput,
    InductorInput,
    ResistorInput,
    TransistorInput,
)
from products.schema.types import (
    CapacitorType,
    DiodeType,
    InductorType,
    ResistorType,
    TransistorType,
)
from products.strategy_transistor import (
    ConcreteStrategyBJT,
    ConcreteStrategyIGBT,
    ConcreteStrategyMOSFET,
    TransistorQuery,
)

logger = logging.getLogger(__name__)


class ProductListQuery(graphene.ObjectType):
    capacitors_query = graphene.List(CapacitorType, inputs=CapacitorInput())
    diodes_query = graphene.List(DiodeType, inputs=DiodeInput())
    resistors_query = graphene.List(ResistorType, inputs=ResistorInput())
    inductors_query = graphene.List(InductorType, inputs=InductorInput())
    transistors_query = graphene.List(TransistorType, inputs=TransistorInput())

    def resolve_capacitors_query(self, info, inputs):
        try:
            logger.info( "#"*10 + " Initializing Capacitor Query." + "#"*10)
            filter_kwargs = clean_inputs(inputs)
            logger.debug("// Filter Kwargs: %s", filter_kwargs)
            return Capacitor.objects.filter(**filter_kwargs)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")

    def resolve_diodes_query(self, info, inputs):
        try: 
            logger.info("#"*10 + " Initializing Diode Query." + "#"*10)
            filter_kwargs = clean_inputs(inputs)
            logger.debug("// Filter Kwargs: %s", filter_kwargs)
            return Diode.objects.filter(**filter_kwargs)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")
        
    def resolve_resistors_query(self, info, inputs):
        try:
            logger.info("#"*10 + " Initializing Resistor Query." + "#"*10)
            filter_kwargs = clean_inputs(inputs)
            logger.debug("// Filter Kwargs: %s", filter_kwargs)
            return Resistor.objects.filter(**filter_kwargs)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")
        
    def resolve_inductors_query(self, info, inputs):
        try:
            logger.info("#"*10 + "## Initializing Inductor Query." + "#"*10)
            filter_kwargs = clean_inputs(inputs)
            logger.debug("// Filter Kwargs: %s", filter_kwargs)
            return Inductor.objects.filter(**filter_kwargs)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")
        

    def resolve_transistors_query(self, info, inputs):
        try:
            logger.info("#"*10 +"Initializing Transistor Query."+ "#"*10)

            if inputs.transistor_type == "BJT":
                strategy = ConcreteStrategyBJT()
            if inputs.transistor_type == "MOSFET":
                strategy = ConcreteStrategyMOSFET()
            if inputs.transistor_type == "IGBT":
                strategy = ConcreteStrategyIGBT()

            filter_kwargs = clean_inputs(inputs)
            transistor_context = TransistorQuery(strategy)

            return transistor_context.execute(filter_kwargs)
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")
        

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


        elif input_field == "model":
            field_value = field_value.upper()
            filter_kwargs[f"{input_field}__startswith"] = field_value

        else:
            filter_kwargs[input_field] = field_value

    return filter_kwargs
