import React from 'react';
import {useState, useEffect} from 'react';
import CartItemTableRow from './CartItemTableRow';
import {CREATE_ORDER, createOrderInput} from "../graphql_queries/purchase_queries/CreateOrder"
import {removeFromCart} from "../utils/cartFunctions"
import { useMutation } from '@apollo/client';
import  WaitingSpinner  from "../components/purchased_products/WaitingSpinner"
import ErrorMessage from './ErrorMessage';


function Cart() {

  const cartList = JSON.parse(localStorage.getItem('cart')) || [];
  const [totalValue, serTotalValue] = useState(0)
  const [productsToPurchase, setProductsToPurchase] = useState([])
  const [isLoading, serIsLoading] = useState(false)
  const [errorMesage, setErrorMessage] = useState(false);
  const [productsInCart, setProductsInCart] = useState(cartList)



  useEffect(() => {
    createOrderInput.inputs.productsToPurchase = productsToPurchase  
  }, [productsToPurchase]);  

  const removeItemFromList = (componentType, componentID) => {
    const newList = productsInCart.filter((item) => (
      item[0] !== componentType || item[1] !== componentID
    ));
    const newProductsToPurchase = productsToPurchase.filter((product) => 
      (product.componentType !== componentType && product.componentId !==  componentID)
    )
    setProductsToPurchase(newProductsToPurchase);
    setProductsInCart(newList);  
    removeFromCart(componentType, componentID)
  }


  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER);

  const handleCreateOrder = async () => {

    const variables = createOrderInput
    variables.inputs.productsToPurchase = productsToPurchase
    const checkProductAmount = (variables) => {
      const componentWithZeroCount = variables.inputs.productsToPurchase.filter((component)=>(
        component.quantity === 0
      ))
      if (componentWithZeroCount.length > 0) {
          return false
      }
      return true
    }
      if (checkProductAmount(variables)){
        try {
          const l = document.querySelector(".cart-content")
          l.style.display = "none"
          serIsLoading(true)
          setErrorMessage("")
          const result = await createOrder({
            variables: variables
          });
          window.open(result.data.createOrder.url,"_self")
        } catch (errors) {
          console.log(errors)
          document.querySelector(".cart-content").style.display = "block"
          serIsLoading(false)
          setErrorMessage("An error occurred")
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

        }    
      } else{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setErrorMessage("Error. Select the quantity of the products you are going to buy")

      }
  };   


  return (
    <div className='m-5'>
      {isLoading === true && <WaitingSpinner/>}

      
      {errorMesage.length > 0  && <ErrorMessage error={errorMesage}/>}    
      
      <div className='cart-content'>
      <div className="container d-flex align-items-center justify-content-start">
        <main className="row">
          <div className="col-md-6 col-lg-6 order-md-last">
            <ul className="list-group mb-3 cart-items-row">
              {productsInCart.map((product) => (
                <CartItemTableRow
                  setProductsToPurchase={setProductsToPurchase}
                  productsToPurchase={productsToPurchase}
                  key={`${product[0]}-${product[1]}`}
                  removeItemFromList={removeItemFromList}
                  componentType={product[0]}
                  componentID={product[1]}
                  serTotalValue={serTotalValue}
                  totalValue={totalValue}
                />
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${totalValue}</strong>
              </li>
            </ul>
          </div>

    <div className="col-md-4 col-lg-4 align-self-start text-left">
      <h2>Cart</h2>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">List of Products</span>
        <span className="badge bg-primary rounded-pill">
          {productsInCart.length}
        </span>
      </h4>
          <button
            type="button"
            className="mi-boton mb-3"
            onClick={handleCreateOrder}
          >
            Buy Now
          </button>      
        </div>
      </main>
    </div>
    </div>

    </div>
  );
}

export default Cart;