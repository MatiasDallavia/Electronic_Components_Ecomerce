from django.db import models

from .base_product_model import BaseProductModel


class BJT(BaseProductModel):
    NPN = "NPM"
    PNP = "PNM"

    BJT_TYPES = {
        NPN: "NPN",
        NPN: "NPN",
    }

    TO_5 = "TO-5"
    TO_92 = "TO-92"
    TO_220 = "TO-220"

    PACKAGES_OPTIONS = {TO_5: "TO-5", TO_92: "TO-92", TO_220: "TO-220"}

    package = models.CharField(choices=PACKAGES_OPTIONS, default=TO_5)
    bjt_type = models.CharField(choices=BJT_TYPES, default=NPN)
    ic_max = models.FloatField(null=False, blank=False)
    vce_saturation = models.FloatField(null=False, blank=False)
    dc_current_gain = models.FloatField(null=False, blank=False)
