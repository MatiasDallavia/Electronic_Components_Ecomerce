import logging

import graphene
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.types import (
    BJTType,
    CapacitorType,
    DiodeType,
    IGBTType,
    InductorType,
    MOSFETType,
    ResistorType,
)
from purchases.schema.types import ProductPurchaseType
from purchases.facade.purchase_facade import PaypalPurchaseFacade

logger = logging.getLogger(__name__)

component_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "resistor": Resistor,
    "capacitor": Capacitor,
    "inductor": Inductor,
    "diode": Diode,
}

type_mapping = {
    "BJT": BJTType,
    "MOSFET": MOSFETType,
    "IGBT": IGBTType,
    "resistor": ResistorType,
    "capacitor": CapacitorType,
    "inductor": InductorType,
    "diode": DiodeType,
}


class PurchasesQuery(graphene.ObjectType):
    user_purchased_items = graphene.List(ProductPurchaseType)

    @login_required
    def resolve_user_purchased_items(self, info):
        try:
            request_user = info.context.user
            logger.info("#" * 10 + " Starting UserPurchasedItems query." + "#" * 10)
            logger.debug("Username: %s", request_user)            
            purchase_facede = PaypalPurchaseFacade(user=request_user)
            purchased_products = purchase_facede.get_user_purchase_history()
            return purchased_products
        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")

