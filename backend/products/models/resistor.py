from django.db import models

from .base_product_model import BaseProductModel


class Resistor(BaseProductModel):
    CARBON = "CARBON"
    FILM = "FILM"

    CAPACITOR_TYPES = {
        CARBON: "Carbon Resistor",
        FILM: "Film Resistor",
    }

    AXIAL = "AXIAL"
    P0402 = "0402"
    P0603 = "0603"

    PACKAGES_OPTIONS = {AXIAL: "AXIAL", P0402: "P0402", P0603: "0603"}

    package = models.CharField(choices=PACKAGES_OPTIONS, default=AXIAL)
    resistor_type = models.CharField(choices=CAPACITOR_TYPES, default=CARBON)
    resistance = models.FloatField(null=False, blank=False)
    tolerance = models.FloatField(null=False, blank=False)
    power = models.FloatField(null=False, blank=False)
