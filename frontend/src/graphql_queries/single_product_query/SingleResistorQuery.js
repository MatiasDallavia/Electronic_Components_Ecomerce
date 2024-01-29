
const GET_SINGLE_RESISTOR = `
    query Resistors($inputs: ResistorInput!){
        resistorsQuery(inputs: $inputs) {
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            resistance
            tolerance
            power
            componentType    
        
        }
    }`;

const singleResistorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_SINGLE_RESISTOR, singleResistorInput}    