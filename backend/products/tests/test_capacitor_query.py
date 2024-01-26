import json

import pytest
from graphene_django.utils.testing import graphql_query


@pytest.fixture
def client_query(client):
    def func(*args, **kwargs):
        return graphql_query(*args, **kwargs, client=client)

    return func


@pytest.mark.django_db()
def test_some_query(client_query):
    variables = {
        "inputs": {
            "model": None,
            "mountingTechnology": "SMD",
            "manufacturer": None,
            "capacitorType": "ELECTROLYTIC",
            "capacitance": None,
            "voltage": None,
        }
    }

    response = client_query(
        """
        query Capacitors($inputs: CapacitorInput!){
        capacitorsQuery(inputs: $inputs) {
            id
            productId
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            capacitorType
            capacitance
            tolerance
            voltage
            esr
            componentType
            
        }
        }
        """,
        variables=variables,
    )

    content = json.loads(response.content)
    assert "errors" not in content
