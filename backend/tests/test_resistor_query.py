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
            "resistance": None,
            "tolerance": None,
            "power": None,
        }
    }

    response = client_query(
        """
        query Resistors($inputs: ResistorInput!){
        resistorsQuery(inputs: $inputs) {

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
            
        }
        }
        """,
        variables=variables,
    )

    content = json.loads(response.content)
    assert "errors" not in content
