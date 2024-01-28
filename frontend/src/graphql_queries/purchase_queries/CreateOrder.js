
const CREATE_ORDER = `
    mutation createOrder($inputs: CreateOrderInput!){
        createOrder(inputs: $inputs) {
                url
    }
}`;

const createOrderInput = {
  "inputs":{
      "productsToPurchase": [

      ]
    }
  }
  
  
  
export {CREATE_ORDER, createOrderInput}    