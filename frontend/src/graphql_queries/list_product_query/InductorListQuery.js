import { gql } from '@apollo/client';

const GET_LIST_INDUCTORS = `
query Inductor($inputs: InductorInput!) {
  inductorsQuery(inputs: $inputs) {
    id
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
    componentType
  }
}
`;


const InductorListInput = {
  inputs: {
    model: null,
    mountingTechnology: null,
    manufacturer: null,
    inductorType: null,
    coreMaterial: null,
    inductance: null,
    current: null 
  }
}


export {GET_LIST_INDUCTORS, InductorListInput}


