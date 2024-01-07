from django.db import models

from .base_product_model import BaseProductModel


class Diode(BaseProductModel):
    SCHOTTKY = "SCHOTTKY"
    RECTIFIER = "RECTIFIER"
    ZENER = "ZENER"

    DIODES_TYPES = {
        SCHOTTKY: "Schottky Diode",
        RECTIFIER: "Rectifier Diode",
        ZENER: "Zener Diode",
    }

    DO_41 = "DO-41"
    DO_35 = "DO-35"
    SOD_123 = "SOD-123"
    SOD_80 = "SOD-80"

    PACKAGES_OPTIONS = {
        DO_41: "DO-41",
        DO_35: "DO-35",
        SOD_123: "SOD-123",
        SOD_80: "SOD-80",
    }

    package = models.CharField(choices=PACKAGES_OPTIONS, default=DO_41)
    diode_type = models.CharField(choices=DIODES_TYPES, default=SCHOTTKY)
    dc_reverse = models.FloatField(null=False, blank=False)
    current = models.FloatField(null=False, blank=False)
    reverse_recovery = models.FloatField(null=False, blank=False)
