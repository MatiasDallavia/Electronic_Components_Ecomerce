
const GET_LIST_CAPACITORS = `
    query Capacitors($inputs: CapacitorInput!){
        capacitorsQuery(inputs: $inputs) {
            id
            model
            description
            price
            amountAvailable
            manufacturer
            package
            capacitance
            capacitorType
            mountingTechnology
            componentType
        }
    }`;

const capacitorListInput = {
    inputs: {
      mountingTechnology: null,
      manufacturer: null,
      capacitorType: null,
      capacitance: null,
      voltage: null
    }
  }
  
  
  export {GET_LIST_CAPACITORS, capacitorListInput}    