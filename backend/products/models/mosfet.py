from django.db import models

from .base_product_model import BaseProductModel


class MOSFET(BaseProductModel):
    TO_220 = "TO-220fp"
    TO_220fp = "TO-220"

    PACKAGES_OPTIONS = {TO_220fp: "TO-220fp", TO_220: "TO-220"}

    package = models.CharField(choices=PACKAGES_OPTIONS, default=TO_220)
    dsv = models.FloatField(null=False, blank=False)
    drive_voltage = models.FloatField(null=False, blank=False)
    rds_on = models.FloatField(null=False, blank=False)
    vgs = models.FloatField(null=False, blank=False)
    input_capacitance = models.FloatField(null=False, blank=False)
