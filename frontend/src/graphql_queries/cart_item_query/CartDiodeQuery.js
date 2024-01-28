
const GET_DIODE_FROM_CART = `
    query Diodes($inputs: DiodeInput!){
    diodesQuery(inputs: $inputs) {
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
            componentType
        }
    }`;

const singleDiodeInput = {
        inputs: {
          id: null
        }
  }
  
  
  export {GET_DIODE_FROM_CART, singleDiodeInput}    