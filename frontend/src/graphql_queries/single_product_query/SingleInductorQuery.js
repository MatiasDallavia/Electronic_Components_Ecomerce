
const GET_SINGLE_INDUCTOR = `
query GetInductors($inputs: InductorInput!){
  inductorsQuery(inputs: $inputs) {
      model
      description
      price
      mountingTechnology
      operatingTemperature
      amountAvailable
      manufacturer
      package
      inductorType
      coreMaterial
      inductance
      current
      vr
  }
}`;


const singleInductorInput = {
  inputs: {
    id: null
  }
}


export {GET_SINGLE_INDUCTOR, singleInductorInput}


