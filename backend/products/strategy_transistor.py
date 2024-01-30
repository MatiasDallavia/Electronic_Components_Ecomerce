import logging
from abc import ABC, abstractmethod
from typing import List
from enum import Enum

from graphql import GraphQLError

from products.models import BJT, IGBT, MOSFET
from products.schema.types import BJTType, IGBTType, MOSFETType

logger = logging.getLogger(__name__)


class TransistorStrategy(ABC):
    """
    The Strategy interface declares operations common to all supported versions
    of some algorithm.

    The Context uses this interface to call the algorithm defined by Concrete
    Strategies.
    """

    @abstractmethod
    def query_transistors(self, data: List):
        pass

    @abstractmethod
    def check_transistor_type_input_field(self, data):
        pass

class TransistorQuery:
    """
    The Context defines the interface of interest to clients.
    """

    def __init__(self, transistor_strategy: TransistorStrategy):
        if not isinstance(transistor_strategy, TransistorStrategy):
            raise Exception(
                f"Context requires a TransistorStrategy object but "
                f"{type(transistor_strategy)} was given"
            )
        self._transistor_strategy = transistor_strategy

    @property
    def get_strategy(self) -> TransistorStrategy:
        return self._transistor_strategy

    def execute(self, filter_kwargs: dict) -> List:
        """
        Executes the query_transistors method of the strategy
        """

        filter_kwargs.pop("transistor_type")
        if not filter_kwargs.get("id"):
            filter_kwargs = self._transistor_strategy.check_transistor_type_input_field(filter_kwargs)

        filter_kwargs.pop("mosfet_input", None)
        filter_kwargs.pop("bjt_input", None)
        filter_kwargs.pop("igbt_input", None)            
        transistors = self._transistor_strategy.query_transistors(filter_kwargs)
        return transistors


class ConcreteStrategyBJT(TransistorStrategy):
    """
    Strategy class for quering a list of BJTs objects and returning them
    in an BJTType object
    """

    def check_transistor_type_input_field(self, filter_kwargs) -> dict:
        """
        Cleans input parameters of 'bjt_input' by removing empty filter values and extracs the  actual
        values from the Enums objets.

        Args:
            inputs (dict): the filter kwargs.

        Returns:
            dict: dict with all the fields to filter the query to the db.
        """
        for field_name, field_value in filter_kwargs["bjt_input"].items():
            if field_value is None:
                continue
            if isinstance(field_value, Enum):
                filter_kwargs[field_name] = field_value.value
            else:
                filter_kwargs[field_name] = field_value



        return filter_kwargs    

    def query_transistors(self, filter_kwargs: dict) -> List[BJTType]:
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
        return bjts


class ConcreteStrategyMOSFET(TransistorStrategy):
    """
    Strategy class for quering a list of MOSFETs objects and returning them
    in an MOSFETType object
    """

    def check_transistor_type_input_field(self, filter_kwargs) -> dict: 
        """
        Cleans input parameters of 'mosfet_input' by removing empty filter values and extracs the  actual
        values from the Enums objets.

        Args:
            inputs (dict): the filter kwargs.

        Returns:
            dict: dict with all the fields to filter the query to the db.
        """             
        for field_name, field_value in filter_kwargs["mosfet_input"].items():
            if field_value is None:
                continue
            if isinstance(field_value, Enum):
                filter_kwargs[field_name] = field_value.value
            else:
                filter_kwargs[field_name] = field_value

        return filter_kwargs

    def query_transistors(self, filter_kwargs: dict) -> List[MOSFETType]:
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
        return mosfets


class ConcreteStrategyIGBT(TransistorStrategy):
    """
    Strategy class for quering a list of IGBTs objects and returning them
    in an IGBTType object
    """

    def check_transistor_type_input_field(self, filter_kwargs) -> dict:
        """
        Cleans input parameters of 'igbt_input' by removing empty filter values and extracs the  actual
        values from the Enums objets.

        Args:
            inputs (dict): the filter kwargs.

        Returns:
            dict: dict with all the fields to filter the query to the db.
        """        

        for field_name, field_value in filter_kwargs["igbt_input"].items():
            if field_value is None:
                continue
            if isinstance(field_value, Enum):
                filter_kwargs[field_name] = field_value.value
            else:
                filter_kwargs[field_name] = field_value
            
        
        return filter_kwargs

    def query_transistors(self, filter_kwargs: dict) -> List[IGBTType]:
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
        return igbts
