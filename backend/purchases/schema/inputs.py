import graphene


class ComponentModelListEnum(graphene.Enum):
    DIODE = "diode"
    BJT = "bjt"
    MOSFET = "mosfet"
    IGBT = "igbt"
    CAPACITOR = "capacitor"
    RESISTOR = "resistor"
    INDUCTOR = "inductor"


class ProductInput(graphene.InputObjectType):
    component_type = graphene.Field(ComponentModelListEnum)
    component_id = graphene.ID()
    price = graphene.Float()

class CreateOrderInput(graphene.InputObjectType):
    products_to_purchase = graphene.List(ProductInput)
    user_name = graphene.String()
