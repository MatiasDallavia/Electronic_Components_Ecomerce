from abc import ABC, abstractmethod
from typing import List

from products.models import BJT, IGBT, MOSFET
from products.schema.types import BJTType, IGBTType, MOSFETType


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


class TransistorQuery:
    """
    The Context defines the interface of interest to clients.
    """

    def __init__(self, transistor_strategy: TransistorStrategy):
        self._transistor_strategy = transistor_strategy

    @property
    def get_strategy(self) -> TransistorStrategy:
        return self._transistor_strategy

    def execute(self, filter_kwargs: dict) -> List:
        """
        Executes the query_transistors method of the strategy
        """
        filter_kwargs.pop("transistor_type")
        return self._transistor_strategy.query_transistors(filter_kwargs)


class ConcreteStrategyBJT(TransistorStrategy):
    """
    Strategy class for quering a list of BJTs objects and returning them
    in an BJTType object
    """

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
