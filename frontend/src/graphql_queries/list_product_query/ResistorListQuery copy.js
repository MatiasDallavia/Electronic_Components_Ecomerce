
const GET_RESISTORS = gql`
    query Resistors($inputs: ResistorInput!){
        resistorListQuery(inputs: $inputs) {
            id
            productId
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            componentType
        
        }
    }`;

const ResistorInput = {
    inputs: {
      model: null,
      mountingTechnology: null,
      manufacturer: null,
      inductorType: null,
      coreMaterial: null,
      inductance: null,
      current: null 
    }
  }
  
  
  export {GET_RESISTORS, ResistorInput}    