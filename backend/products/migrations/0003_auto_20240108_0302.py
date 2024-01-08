from django.db import migrations
from products.models import BJT,MOSFET,IGBT,Diode,Resistor,Inductor,Capacitor
import uuid


def gen_uuid(apps, schema_editor):
    for row in BJT.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])
    for row in MOSFET.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])
    for row in IGBT.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])
    for row in Resistor.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])
    for row in Diode.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])
    for row in Inductor.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])
    for row in Capacitor.objects.all():
        row.product_id = uuid.uuid4()
        print(f"Setting {row.product_id} into {row.pk}")
        row.save(update_fields=["product_id"])        

class Migration(migrations.Migration):
    dependencies = [
        ("products", "0002_rename_dsv_mosfet_vds_bjt_product_id_and_more"),
    ]

    operations = [
        # omit reverse_code=... if you don't want the migration to be reversible.
        migrations.RunPython(gen_uuid, reverse_code=migrations.RunPython.noop),
    ]
