import graphene


class ComponentModelEnum(graphene.Enum):
    DIODE = "diode"
    BJT = "BJT"
    MOSFET = "MOSFET"
    IGBT = "IGBT"
    CAPACITOR = "capacitor"
    RESISTOR = "resistor"
    INDUCTOR = "inductor"


class ProductInput(graphene.InputObjectType):
    component_type = graphene.Field(ComponentModelEnum)
    component_id = graphene.ID()
    price = graphene.Float()


class CreateOrderInput(graphene.InputObjectType):
    products_to_purchase = graphene.List(ProductInput)
