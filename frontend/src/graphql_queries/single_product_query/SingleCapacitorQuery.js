
const GET_SINGLE_CAPACITOR = `
    query Capacitors($inputs: CapacitorInput!){
        capacitorsQuery(inputs: $inputs) {
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            capacitorType
            capacitance
            tolerance
            voltage
            esr
            componentType
        
        }
    }`;

const SingleCapacitorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_SINGLE_CAPACITOR, SingleCapacitorInput}    