from django.db import models
from django.contrib.auth.models import User

class ProductPurchase(models.Model):
    COMPONENT_TYPES = {
        "BJT": "BJT",
        "MOSFET": "MOSFET",
        "IGBT": "IGBT",
        "CAPACITOR": "Capacitor",
        "RESISTOR": "Resistor",
        "DIODE": "Diode",
        "INDUCTOR": "Inductor",

    }
    component_type = models.CharField(choices=COMPONENT_TYPES, default="BJT", null=False)
    component_id = models.IntegerField(null=False)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False)
    price = models.FloatField(null=False)
    quantity = models.IntegerField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        return self.quantity * self.price
    
        