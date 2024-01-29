
const GET_LIST_DIODES = `
    query Diodes($inputs: DiodeInput!){
    diodesQuery(inputs: $inputs) {
            id
            model
            description
            price
            amountAvailable
            manufacturer
            package
            componentType
            mountingTechnology
        }
    }`;

const diodeListInput = {
        inputs: {
          model: null,
          mountingTechnology: null,
          manufacturer: null,
          diodeType: null,
          dcReverse: null,
          current: null,  
        }
  }
  
  
  export {GET_LIST_DIODES, diodeListInput}    