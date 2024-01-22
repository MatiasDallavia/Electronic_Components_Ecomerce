import graphene
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ProductPurchaseType(graphene.ObjectType):
    package = graphene.String()
    component_name = graphene.String()
    price = graphene.Float()
    quantity = graphene.Int()
    total_price = graphene.Float()
    mounting_technology = graphene.String()

    def resolve_component_name(self, info):
        component = self.component_name
        if (
            isinstance(component, BJT)
            | isinstance(component, MOSFET)
            | isinstance(component, IGBT)
            | isinstance(component, Diode)
        ):
            return component.model

        elif isinstance(component, Resistor):
            return f"Resistor {component.resistance}"

        elif isinstance(component, Capacitor):
            return f"Capacitor {component.capacitance}"

        elif isinstance(component, Inductor):
            return f"Inductor {component.inductance}"
