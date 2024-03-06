import logging

import graphene
from django.contrib.auth.models import User
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
from purchases.models import ProductPurchase
from purchases.schema.types import ComponentUnionType, ProductPurchaseType
# from utils import create_component_node

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
            logger.info(
                "#" * 10 + " Initializing User Purchased Items Query." + "#" * 10
            )
            logger.debug("// User: %s", user)

            user = User.objects.filter(username=request_user).first()
            user_purchases = ProductPurchase.objects.filter(user=user)
            logger.debug(
                "// User's purchases (ID): %s",
                [id for id in user_purchases.values_list("id", flat=True)],
            )

            # Groups the a set of all ids of products with a list every single id with their 
            # quantity and purchase data, separeted by component type
            purchased_components = {}
            for item in user_purchases:
                component_type = item.component_type

                if component_type in purchased_components:
                    purchased_components[component_type][1].append(
                        (
                            item.component_id,
                            item.quantity,
                            item.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
                        )
                    )
                    purchased_components[component_type][0].append(item.component_id)
                else:
                    purchased_components[component_type] = (
                        [item.component_id],
                        [
                            (
                                item.component_id,
                                item.quantity,
                                item.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
                            )
                        ],
                    )

            logger.debug(
                "// User's purchases by component (ID): \n%s",
                "\n".join(
                    [
                        f"{component_type}: {values[1]}"
                        for component_type, values in purchased_components.items()
                    ]
                ),
            )

            # retrives the object model of the product and creates a list of ProductPurchaseType 
            components_purchased = []
            for component_type, values in purchased_components.items():
                ids = values[0]
                items_data = values[1]
                component_model = component_mapping[component_type]
                products = component_model.objects.filter(id__in=ids)

                for item in items_data:

                    component_id = item[0]
                    quantity = item[1]
                    purchase_date = item[2]

                    obj = products.get(id=component_id)

                    components_purchased.append(
                        ProductPurchaseType(
                            component_node=create_component_node(obj),
                            quantity=quantity,
                            purchase_date=purchase_date,
                        )
                    )

            return components_purchased

        except Exception as e:
            logger.error("!!  Internal Error: %s", e)
            raise GraphQLError(f"There was an internal error")




def create_component_node(component_object) -> ComponentUnionType:
    """
    Creates an object type based on the given component object.

    Args:
        component_object: Component object to create the node for.

    Returns:
        ComponentUnionType: GraphQL component node.
    """
    component_node = None

    if isinstance(component_object, BJT):
        component_node = BJTType(
            model=component_object.model,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )

    if isinstance(component_object, MOSFET):
        component_node = MOSFETType(
            model=component_object.model,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )

    if isinstance(component_object, IGBT):
        component_node = IGBTType(
            model=component_object.model,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )

    if isinstance(component_object, Resistor):
        component_node = ResistorType(
            resistance=component_object.resistance,
            power=component_object.power,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )

    if isinstance(component_object, Inductor):
        component_node = InductorType(
            inductance=component_object.inductance,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )

    if isinstance(component_object, Capacitor):
        component_node = CapacitorType(
            capacitance=component_object.capacitance,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )

    if isinstance(component_object, Diode):
        component_node = DiodeType(
            model=component_object.model,
            price=component_object.price,
            package=component_object.package,
            mounting_technology=component_object.mounting_technology,
        )
    return component_node