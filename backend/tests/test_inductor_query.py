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
            "mountingTechnology": None,
            "manufacturer": None,
            "inductorType": None,
            "coreMaterial": None,
            "inductance": None,
            "current": 1.0,
        }
    }

    response = client_query(
        """
        query Inductor($inputs: InductorInput!){
        inductorsQuery(inputs: $inputs) {
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
            inductorType
            coreMaterial
            inductance
            current
            vr
 
            }
        }
        """,
        variables=variables,
    )

    content = json.loads(response.content)
    assert "errors" not in content
