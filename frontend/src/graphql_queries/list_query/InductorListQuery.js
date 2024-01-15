import { gql } from '@apollo/client';

const GET_INDUCTORS = gql`
query GetInductors($inputs: InductorInput!){
  inductorListQuery(inputs: $inputs) {
      id
      model
      description
      price
      mountingTechnology
      amountAvailable
      manufacturer
      package
      componentType    
  }
}`;


const InductorInput = {
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


export {GET_INDUCTORS, InductorInput}


