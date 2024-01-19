import { gql } from '@apollo/client';

const GET_INDUCTOR_FROM_CART = gql`
query GetInductors($inputs: InductorInput!){
  inductorListQuery(inputs: $inputs) {
      model
      price
      amountAvailable
  }
}`;


const singleInductorInput = {
  inputs: {
    id: null
  }
}


export {GET_INDUCTOR_FROM_CART, singleInductorInput}


