import { gql } from '@apollo/client';

const GET_LIST_INDUCTORS = gql`
query GetInductors($inputs: InductorInput!){
  inductorListQuery(inputs: $inputs) {
        id
        model
        description
        price
        amountAvailable
        manufacturer
        package
        componentType
    }
}`;


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


