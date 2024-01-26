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
            "diodeType": None,
            "dcReverse": None,
            "current": None,
        }
    }

    response = client_query(
        """
        query Diodes($inputs: DiodeInput!){
        diodesQuery(inputs: $inputs) {
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
            diodeType
            dcReverse
            current
            reverseRecovery
        }
        }
        """,
        variables=variables,
    )

    content = json.loads(response.content)
    assert "errors" not in content
