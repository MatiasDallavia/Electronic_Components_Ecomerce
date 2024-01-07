from django.db import models

from .base_product_model import BaseProductModel


class Inductor(BaseProductModel):
    SOLENOID = "SOLENOID"
    TOROID = "TOROID"

    INDUCTOR_TYPES = {
        SOLENOID: "Solenoid Inductor",
        TOROID: "Toroid Inductor",
    }

    AIR = "AIR"
    FERRITE = "FERRITE"
    ALLOY = "ALLOY"

    MATERIAL_CORE_TYPES = {
        AIR: "Air Core",
        FERRITE: "Ferrite Core",
        ALLOY: "Alloy Core",
    }

    P2220 = "2220"
    P330 = "330"
    P101 = "101"
    DIL = "DIL"

    PACKAGES_OPTIONS = {P2220: "2220", P330: "330", P101: "101", DIL: "DIL"}

    package = models.CharField(choices=PACKAGES_OPTIONS, default=DIL)
    inductor_type = models.CharField(choices=INDUCTOR_TYPES, default=SOLENOID)
    core_material = models.CharField(choices=MATERIAL_CORE_TYPES, default=FERRITE)
    inductance = models.FloatField(null=False, blank=False)
    current = models.FloatField(null=False, blank=False)
    vr = models.FloatField(null=False, blank=False)
    rr = models.FloatField(null=False, blank=False)
