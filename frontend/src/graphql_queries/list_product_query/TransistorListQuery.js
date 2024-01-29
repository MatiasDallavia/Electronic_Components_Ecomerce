
const GET_LIST_TRANSISTORS = `
query Transistors($inputs: TransistorInput!){
  transistorsQuery(inputs: $inputs) {
        __typename
        ... on BJTType {
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
        ... on MOSFETType {
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
        ... on IGBTType{
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
    }
    }`;

const TransistorListInput = {
    inputs: {
        transistorType: "BJT",
        model: "",
        mountingTechnology: null,
        manufacturer: null,
        bjtInput:{
          bjtType: null,
          icMax: null,
          dcCurrentGain: null
        },
        mosfetInput:{
          vds: null,
          driveVoltage: null,
          rdsOn: null
        },
        igbtInput: {
          vc: null,
          ic: null,
          powerMax: null
        }
      }
  }
  
  
  export {GET_LIST_TRANSISTORS, TransistorListInput}    