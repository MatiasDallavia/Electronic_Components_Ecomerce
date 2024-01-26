import pytest

from django.core.management import call_command

@pytest.fixture(scope='session')
def django_db_setup(django_db_setup, django_db_blocker):
    fixtures = [
        'tests/fixtures/resistor_fixture.json',
        'tests/fixtures/diode_fixture.json',
        'tests/fixtures/capacitor_fixture.json',
        'tests/fixtures/inductor_fixture.json',
        'tests/fixtures/BJT_fixture.json',
        'tests/fixtures/MOSFET_fixture.json',
        'tests/fixtures/IGBT_fixture.json',
    ]

    with django_db_blocker.unblock():
        call_command('loaddata', *fixtures)