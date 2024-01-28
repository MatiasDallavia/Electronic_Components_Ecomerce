
const GET_RESISTOR_FOR_CART = `
    query Resistors($inputs: ResistorInput!){
        resistorsQuery(inputs: $inputs) {
            model
            price
            resistance
            amountAvailable   
        }
    }`;

const singleResistorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_RESISTOR_FOR_CART, singleResistorInput}    