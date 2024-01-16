import graphene
from graphene_django.types import DjangoObjectType
from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.enums import (
    BJTPackagesOptionsEnum,
    BJTTypesEnum,
    IGBTPackagesOptionsEnum,
    ManufacturerEnum,
    MOSFETPackagesOptionsEnum,
    MountingTechnologyEnum,
)


class ProductTypeField(graphene.ObjectType):
    component_type = graphene.String()


class CapacitorType(DjangoObjectType, ProductTypeField):
    class Meta:
        model = Capacitor
        fields = "__all__"

    def resolve_component_type(self, info):
        return "capacitor"


class ResistorType(DjangoObjectType, ProductTypeField):
    class Meta:
        model = Resistor
        fields = "__all__"

    def resolve_component_type(self, info):
        return "resistor"


class DiodeType(DjangoObjectType, ProductTypeField):
    class Meta:
        model = Diode
        fields = "__all__"

    def resolve_component_type(self, info):
        return "diode"


class InductorType(DjangoObjectType, ProductTypeField):
    class Meta:
        model = Inductor
        fields = "__all__"

    def resolve_component_type(self, info):
        return "inductor"


class BaseProductModelType(graphene.ObjectType):
    id = graphene.ID()
    product_id = graphene.UUID()
    model = graphene.String()
    description = graphene.String()
    price = graphene.Float()
    mounting_technology = graphene.String()
    operating_temperature = graphene.String()
    amount_available = graphene.Int()
    manufacturer = graphene.String()
    package = graphene.String()

    def resolve_package(self, info):
        return self.package.replace("-","_")

    def resolve_operating_temperature(self, info):
        return f"{self.operating_temperature} C°"   


class BJTType(BaseProductModelType, ProductTypeField):
    bjt_type = graphene.String()
    ic_max = graphene.String()
    vce_saturation = graphene.String()
    dc_current_gain = graphene.String()

    def resolve_component_type(self, info):
        return "BJT"
    
    def resolve_ic_max(self, info):
        return check_ampere_notation(self.ic_max)
    
    def resolve_dc_current_gain(self, info):
        return int(self.dc_current_gain)    

    def resolve_vce_saturation(self, info):
        return check_voltage_notation(self.vce_saturation)        



class MOSFETType(BaseProductModelType, ProductTypeField):
    vds = graphene.String()
    drive_voltage = graphene.String()
    rds_on = graphene.String()
    vgs = graphene.String()
    input_capacitance = graphene.String()

    def resolve_component_type(self, info):
        return "MOSFET"

    def resolve_rds_on(self, info):
        return check_ohm_notation(self.rds_on)
    
    def resolve_vgs(self, info):
        return check_voltage_notation(self.vgs)

    def resolve_drive_voltage(self, info):
        return check_voltage_notation(self.drive_voltage)   

    def resolve_vds(self, info):
        return check_voltage_notation(self.vds)     

    def resolve_input_capacitance(self, info):
        return f"{int(self.vds)} pF"              

class IGBTType(BaseProductModelType, ProductTypeField):
    vc = graphene.String()
    ic = graphene.String()
    vce_on = graphene.String()
    power_max = graphene.String()
    td = graphene.String()
    gc = graphene.String()

    def resolve_component_type(self, info):
        return "IGBT"

    def resolve_vc(self, info):
        return check_voltage_notation(self.vc) 

    def resolve_vce_on(self, info):
        return check_voltage_notation(self.vc) 

    def resolve_ic(self, info):
        return check_ampere_notation(self.ic) 

    def resolve_power_max(self, info):
        return f"{int(self.power_max)} W" 

    def resolve_gc(self, info):
        return f"{int(self.gc)} nC"
    
    def resolve_td(self, info):
        return f"{int(self.td)} ns"    
    
    
class TransistorType(graphene.Union):
    class Meta:
        types = (BJTType, MOSFETType, IGBTType)


def check_ampere_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer(): 
            field_number = f"{field_number}".split(".")[0]
        return field_number + " A" 
    else:    
        return convert_to_mili(field_number) + " mA" 
    

def check_voltage_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer(): 
            field_number = f"{field_number}".split(".")[0]
        return field_number + " V" 
    else:    
        return convert_to_mili(field_number) + " mV"    


def check_ohm_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer(): 
            field_number = f"{field_number}".split(".")[0]
        return field_number + " Ω" 
    else:    
        return convert_to_mili(field_number) + " mΩ"     


def convert_to_mili(field_number):
    return f"{float(field_number) * pow(10, 3)}".split(".")[0]

