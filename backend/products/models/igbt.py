from django.db import models
from .base_product_model import BaseProductModel

class IGBT(BaseProductModel):

    TO_264 = "TO-264"
    TO_220fp = "TO-220fp"
    
    PACKAGES_OPTIONS = {
        TO_220fp: "TO-220fp",
        TO_264: "TO-264"
    }

    package = models.CharField(choices=PACKAGES_OPTIONS, default=TO_220fp)
    vc = models.FloatField(null=False, blank=False)
    ic = models.FloatField(null=False, blank=False)
    vce_on = models.FloatField(null=False, blank=False)
    power_max = models.FloatField(null=False, blank=False)
    td = models.FloatField(null=False, blank=False)
    gc = models.FloatField(null=False, blank=False)
