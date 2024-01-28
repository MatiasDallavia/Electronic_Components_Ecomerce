import React from 'react';
import {useState, useEffect} from 'react';
import {CREATE_ORDER, createOrderInput} from "../../graphql_queries/purchase_queries/CreateOrder"
import {removeFromCart} from "../../utils/cartFunctions"
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"
import ErrorMessage from '../ErrorMessage';
import CartProductList from './CartProductList';

import {emptyCart} from "../../utils/cartFunctions"
import {fetchData} from "../../utils/fetchData"
import { getJWT } from '../../utils/token';

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


  const createOrder1 = async () => {

    const variables = createOrderInput
    variables.inputs.productsToPurchase = productsToPurchase
    console.log(productsToPurchase)

    const checkProductAmount = (variables) => {
      const componentWithZeroCount = variables.inputs.productsToPurchase.filter((component)=>(
        component.quantity === 0
      ))
      if (componentWithZeroCount.length > 0) {
          return false
      }
      return true
    }

    //checks if the quantity of all products are higher to 0
    if (! checkProductAmount(variables)){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setErrorMessage("Error. Select the quantity of the products you are going to buy")

    }

    else {

      try {
        // renders the loading screen
        document.querySelector(".cart-content").style.display = "none"
        serIsLoading(true)

        setErrorMessage("")
        const token = await getJWT()
        console.log("TOKENNN: ", token)
        const data = await fetchData(CREATE_ORDER, variables, token);
        const paymentUrl = data.createOrder.url

        emptyCart()
        window.open(paymentUrl,"_self")

      } catch (errors) {
        console.log(errors.graphQLErrors)
        document.querySelector(".cart-content").style.display = "block"
        serIsLoading(false)
        setErrorMessage("An error occurred")
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      }

    }
  };

  return (
    <div className='m-5'>
      {isLoading === true && <WaitingSpinner/>}
      
      {errorMesage.length > 0  && <ErrorMessage error={errorMesage}/>}    
      
      <div className='cart-content'>
      <div className="container d-flex align-items-center justify-content-start">
        
        <main className="row">
        {  productsInCart.length > 0 ? 
            (   <CartProductList
                productsInCart={productsInCart}
                setProductsToPurchase={setProductsToPurchase}
                productsToPurchase={productsToPurchase}
                removeItemFromList={removeItemFromList}
                serTotalValue={serTotalValue}
                totalValue={totalValue}   
                       
          />) : (
            <div id="no-items-in-cart" className="col-md-6 col-lg-6 order-md-last align-self-end text-start">
              <div className="d-flex align-items-center">
                <hr className="flex-grow-1" />
                <h3 className="mr-3">There are no products in the cart to purchase</h3>
              </div>
            </div>
            )}

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
            onClick={createOrder1}
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