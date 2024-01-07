from django.db import models


class BaseProductModel(models.Model):
    class Meta:
        abstract = True

    SMD = "SMD"
    THT = "THT"
    MOUNTING_TECHNOLOGIES = {
        SMD: "Surface Mount Device(SMD)",
        THT: "Through-Hole Technology(THT)",
    }

    FAIRCHILD = "Fairchild"
    INFINEON = "Infineon"
    TEXAS_INSTRUMENTS = "Texas Instruments"
    SIEMENS = "Siemens"
    SAMSUNG = "Samsung"

    MANUFACTURERS = [
        (FAIRCHILD, "Fairchild"),
        (INFINEON, "Infineon"),
        (TEXAS_INSTRUMENTS, "Texas Instruments"),
        (SIEMENS, "Siemens"),
        (SAMSUNG, "Samsung"),
    ]
    model = models.CharField(max_length=20, null=False, blank=False)
    description = models.TextField(max_length=55, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, blank=False
    )
    mounting_technology = models.CharField(choices=MOUNTING_TECHNOLOGIES, default=THT)
    operating_temperature = models.FloatField(null=False, blank=False)
    amount_available = models.IntegerField(null=False, blank=False)
    manufacturer = models.CharField(choices=MANUFACTURERS, default=FAIRCHILD)
    is_active = models.BooleanField(default=True)
