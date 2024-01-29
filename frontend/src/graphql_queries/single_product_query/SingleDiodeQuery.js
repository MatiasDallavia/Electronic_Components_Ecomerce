
const GET_SINGLE_DIODE = `
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
  
  
  export {GET_SINGLE_DIODE, singleDiodeInput}    