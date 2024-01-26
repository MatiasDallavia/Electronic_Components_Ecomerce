import pytest

from django.core.management import call_command

@pytest.fixture(scope='session')
def django_db_setup(django_db_setup, django_db_blocker):
    fixtures = [
        'products/tests/fixtures/resistor_fixture.json',
        'products/tests/fixtures/diode_fixture.json',
        'products/tests/fixtures/capacitor_fixture.json',
        'products/tests/fixtures/inductor_fixture.json',
        'products/tests/fixtures/BJT_fixture.json',
        'products/tests/fixtures/MOSFET_fixture.json',
        'products/tests/fixtures/IGBT_fixture.json',
    ]

    with django_db_blocker.unblock():
        call_command('loaddata', *fixtures)