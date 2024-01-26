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
            "transistorType": "BJT",
            "model": "",
            "mountingTechnology": None,
            "manufacturer": None,
            "bjtInput": {"bjtType": None, "icMax": None, "dcCurrentGain": None},
            "mosfetInput": {"vds": None, "driveVoltage": None, "rdsOn": None},
            "igbtInput": {"vc": None, "ic": None, "powerMax": None},
        }
    }

    response = client_query(
        """
        query Transistors($inputs: TransistorInput!){
        transistorsQuery(inputs: $inputs) {
            __typename
            ... on BJTType {
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
            bjtType
            icMax
            vceSaturation
            dcCurrentGain  
            }
            ... on MOSFETType {
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
                    vds
                    driveVoltage
                    rdsOn
                    vgs
                    inputCapacitance
            }
            ... on IGBTType{
                package
                vc
                ic
                vceOn
                powerMax
                td
                gc
            
            }
        }
        }
        """,
        variables=variables,
    )

    content = json.loads(response.content)
    assert "errors" not in content
