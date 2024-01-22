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
    component_type = graphene.Field(ComponentModelEnum, required=True)
    component_id = graphene.ID(required=True)
    price = graphene.Float(required=True)
    quantity = graphene.Int(required=True)


class CreateOrderInput(graphene.InputObjectType):
    products_to_purchase = graphene.List(ProductInput, required=True)


class ConfirmOrderInput(graphene.InputObjectType):
    token = graphene.String(required=True)
    username = graphene.String(required=True)
