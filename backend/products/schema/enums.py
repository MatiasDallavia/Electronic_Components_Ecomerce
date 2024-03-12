import graphene

#BaseProductModel Enums
class MountingTechnologyEnum(graphene.Enum):
    SMD = "SMD"
    THT = "THT"

class ManufacturerEnum(graphene.Enum):
    FAIRCHILD = "Fairchild"
    INFINEON = "Infineon"
    TEXAS_INSTRUMENTS = "Texas Instruments"
    SIEMENS = "Siemens"
    SAMSUNG = "Samsung"


#Transistor Types Enums
class TransistorTypesEnum(graphene.Enum):
    ALL = "ALL"
    BJT = "BJT"
    MOSFET = "MOSFET"
    IGBT = "IGBT"


#BJT Enums
class BJTTypesEnum(graphene.Enum):
    NPN = "NPN"
    PNP = "PNP"

class BJTPackagesOptionsEnum(graphene.Enum):
    TO_5 = "TO-5"
    TO_92 = "TO-92"
    TO_220 = "TO-220"    


#MOSFET Enums
class MOSFETPackagesOptionsEnum(graphene.Enum):
    TO_220 = "TO-220fp"
    TO_220fp = "TO-220"  


#IGBT Enums
class IGBTPackagesOptionsEnum(graphene.Enum):
    TO_264 = "TO-264"
    TO_220fp = "TO-220fp"      


#Diode enums
class DiodeTypesEnum(graphene.Enum):
    SCHOTTKY = "SCHOTTKY"
    RECTIFIER = "RECTIFIER"
    ZENER = "ZENER"

class DiodePackagesOptionsEnum(graphene.Enum):
    DO_41 = "DO-41"
    DO_35 = "DO-35"
    SOD_123 = "SOD-123"
    SOD_80 = "SOD-80"    


#Inductor Enums
    
class InductorTypesEnum(graphene.Enum):
    SOLENOID = "SOLENOID"
    TOROID = "TOROID"

class MaterialCoreTypesEnum(graphene.Enum):
    AIR = "AIR"
    FERRITE = "FERRITE"
    ALLOY = "ALLOY"

class InductorPackagesOptionsEnum(graphene.Enum):
    P2220 = "2220"
    P330 = "330"
    P101 = "101"
    DIL = "DIL"    


#Resistor Enums
class CapacitorTypesEnum(graphene.Enum):
    CARBON = "CARBON"
    FILM = "FILM"

class ResistorPackagesOptionsEnum(graphene.Enum):
    AXIAL = "AXIAL"
    P0402 = "0402"
    P0603 = "0603" 


#Capacitor Enums
class CapacitorTypesEnum(graphene.Enum):
    CERAMIC = "CERAMIC"
    FILM = "FILM"
    ELECTROLYTIC = "ELECTROLYTIC"

class CapacitorPackagesOptionsEnum(graphene.Enum):
    BULK = "Bulk"
    P104 = "104"
    P103 = "103"          

class ComponentModelListEnum(graphene.Enum):
    diode = "Diode"
    bjt = "BJT"
    mosfet = "MOSFET"
    igbt = "IGBT"
