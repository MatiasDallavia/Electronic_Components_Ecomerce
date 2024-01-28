
const GET_INDUCTOR_FROM_CART = `
query GetInductors($inputs: InductorInput!){
  inductorsQuery(inputs: $inputs) {
      model
      price
      inductance
      amountAvailable
  }
}`;


const singleInductorInput = {
  inputs: {
    id: null
  }
}


export {GET_INDUCTOR_FROM_CART, singleInductorInput}


