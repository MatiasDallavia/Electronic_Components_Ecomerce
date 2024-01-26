from django.test import TestCase
from graphene_django.utils.testing import GraphQLTestCase

from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
import json
import pytest
from graphene_django.utils.testing import graphql_query

@pytest.fixture
def client_query(client):
    def func(*args, **kwargs):
        return graphql_query(*args, **kwargs, client=client)

    return func

# Test you query using the client_query fixture
@pytest.mark.django_db()
def test_some_query(client_query):
    print("RES: ", Resistor.objects.all())
    print("DIODE: ", Diode.objects.all())
    print(Inductor.objects.all())
    print(Capacitor.objects.all())
    print(BJT.objects.all())
    print(MOSFET.objects.all())
    print(IGBT.objects.all())
    
    assert False