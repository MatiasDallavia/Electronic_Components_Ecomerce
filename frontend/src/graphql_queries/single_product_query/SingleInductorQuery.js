import { gql } from '@apollo/client';

const GET_SINGLE_INDUCTOR = gql`
query GetInductors($inputs: InductorInput!){
  inductorListQuery(inputs: $inputs) {
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
      rr 
  }
}`;


const singleInductorInput = {
  inputs: {
    id: null
  }
}


export {GET_SINGLE_INDUCTOR, singleInductorInput}


