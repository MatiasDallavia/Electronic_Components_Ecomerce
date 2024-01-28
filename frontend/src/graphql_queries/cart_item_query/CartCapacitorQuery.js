
const GET_CAPACITOR_FROM_CART = `
    query Capacitors($inputs: CapacitorInput!){
        capacitorsQuery(inputs: $inputs) {
            price
            amountAvailable
            package
            capacitance
            componentType
        
        }
    }`;

const SingleCapacitorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_CAPACITOR_FROM_CART, SingleCapacitorInput}    