from django.db import models

from .base_product_model import BaseProductModel


class Capacitor(BaseProductModel):
    CERAMIC = "CERAMIC"
    FILM = "FILM"
    ELECTROLYTIC = "ELECTROLYTIC"

    CAPACITOR_TYPES = {
        CERAMIC: "Ceramic Capacitor",
        FILM: "Film Capacitor",
        ELECTROLYTIC: "Electrolytic Capacitor",
    }

    BULK = "Bulk"
    P104 = "104"
    P103 = "103"

    PACKAGES_OPTIONS = {BULK: "Bulk", P103: "103", P104: "104"}

    package = models.CharField(choices=PACKAGES_OPTIONS, default=BULK)
    capacitor_type = models.CharField(choices=CAPACITOR_TYPES, default=ELECTROLYTIC)
    capacitance = models.FloatField(null=False, blank=False)
    tolerance = models.FloatField(null=False, blank=False)
    voltage = models.FloatField(null=False, blank=False)
    esr = models.FloatField(null=False, blank=False)
