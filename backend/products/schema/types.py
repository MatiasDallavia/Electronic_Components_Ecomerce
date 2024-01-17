import graphene

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
    component_type = graphene.String()

    def resolve_package(self, info):
        return self.package.replace("-", "_")

    def resolve_operating_temperature(self, info):
        if self.operating_temperature.is_integer():
            return f"{int(self.operating_temperature)} C°"
        return f"{self.operating_temperature} C°"



class CapacitorType(BaseProductModelType):
    capacitor_type = graphene.String()
    capacitance = graphene.String()
    tolerance = graphene.String()
    voltage = graphene.String()
    esr = graphene.String()


    def resolve_component_type(self, info):
        return "capacitor"

    def resolve_capacitor_type(self, info):
        capacitor_type = self.capacitor_type.lower()
        return capacitor_type.capitalize() + " Capacitor"
    
    def resolve_capacitance(self, info):
        capacitor_type = self.capacitor_type
        capacitance = int(self.capacitance)
        if capacitor_type == "CERAMIC":
            return f"{capacitance}nF"
        return f"{capacitance}pF"
    
    def resolve_tolerance(self, info):
        return f"{int(self.tolerance)}%"

    def resolve_voltage(self, info):
        return check_voltage_notation(self.voltage)

    def resolve_esr(self, info):
        return check_ohm_notation(self.esr)          

class ResistorType(BaseProductModelType):
    resistance = graphene.String()
    tolerance = graphene.String()
    power = graphene.String()


    def resolve_component_type(self, info):
        return "resistor"
    
    def resolve_resistance(self, info):
        return check_ohm_notation(self.resistance)

    def resolve_tolerance(self, info):
        return f"{int(self.tolerance)} %"

    def resolve_power(self, info):
        return check_power_notation(self.power) 
    
    def resolve_operating_temperature(self, info):
        return f"{int(self.operating_temperature)}C°"    

class DiodeType(BaseProductModelType):
    current = graphene.String()
    dc_reverse = graphene.String()
    reverse_recovery = graphene.String()
    diode_type = graphene.String()

    def resolve_component_type(self, info):
        return "diode"

    def resolve_current(self, info):
        return check_ampere_notation(self.current)

    def resolve_dc_reverse(self, info):
        return check_voltage_notation(self.dc_reverse)

    def resolve_reverse_recovery(self, info):
        return check_ampere_notation(self.reverse_recovery)
    
    def resolve_diode_type(self, info):
        diode_type = self.diode_type.lower()
        return self.diode_type.capitalize()

class InductorType(BaseProductModelType):
    inductor_type = graphene.String()
    core_material = graphene.String()
    inductance = graphene.String()
    current = graphene.String()
    vr = graphene.String()

    def resolve_component_type(self, info):
        return "inductor"

    def resolve_inductor_type(self, info):
        inductor_type = self.inductor_type.lower()
        return inductor_type.capitalize()
    
    def resolve_current(self, info):
        return check_ampere_notation(self.current)

    def resolve_core_material(self, info):
        core_material = self.core_material.lower()
        return core_material.capitalize()

    def resolve_inductance(self, info):
        inductance = int(self.inductance)
        if self.package == "P2220" :
            return f"{inductance}nH"
        return f"{inductance}mH"
    
    def resolve_vr(self, info):
        return f"{int(self.vr)}mV"
               

           

class BJTType(BaseProductModelType):
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


class MOSFETType(BaseProductModelType):
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
        return f"{int(self.vds)}pF"


class IGBTType(BaseProductModelType):
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
        return check_power_notation(self.power_max) 

    def resolve_gc(self, info):
        return f"{int(self.gc)}nC"

    def resolve_td(self, info):
        return f"{int(self.td)}ns"


class TransistorType(graphene.Union):
    class Meta:
        types = (BJTType, MOSFETType, IGBTType)


def check_ampere_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "A"
    else:
        return convert_to_mili(field_number) + "mA"


def check_voltage_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "V"
    else:
        return convert_to_mili(field_number) + "mV"


def check_ohm_notation(field_number):
    if field_number >= 1000:
        field_number = int(field_number) * pow(10, -3)
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "kΩ"

    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "Ω"
    else:
        return convert_to_mili(field_number) + "mΩ"


def check_power_notation(field_number):
    if field_number >= 1000:
        field_number = int(field_number) * pow(10, -3)
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "kW"

    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "W"
    else:
        return convert_to_mili(field_number) + "mW"
    

def check_power_notation(field_number):
    if field_number >= 1000:
        field_number = int(field_number) * pow(10, -3)
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "kW"

    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "W"
    else:
        return convert_to_mili(field_number) + "mW"


def convert_to_mili(field_number):
    return f"{float(field_number) * pow(10, 3)}".split(".")[0]
