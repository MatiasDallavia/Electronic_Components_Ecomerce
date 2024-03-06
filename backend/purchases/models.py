from django.db import models
from django.contrib.auth.models import User
from products.models import BJT, MOSFET, IGBT, Capacitor, Resistor, Diode, Inductor
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
    COMPONENT_MODELS = {
        "BJT": BJT,
        "MOSFET": MOSFET,
        "IGBT": IGBT,
        "Capacitor": Capacitor,
        "Resistor" : Resistor,
        "Diode" : Diode,
        "Inductor" : Inductor,
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

    @property
    def get_component_class(self):
        return self.COMPONENT_MODELS[self.component_type]
    
    def get_component_object(self):
        component_class = self.get_component_class()
        return component_class.objects.filter(id=self.component_id).first()
    
        