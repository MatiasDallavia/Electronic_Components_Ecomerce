import React from 'react'
import PurchasedComponentTable from './PurchasedComponentTable';
import WaitingSpinner from './WaitingSpinner';
import { useLocation } from 'react-router-dom';
import {CAPTURE_ORDER, captureOrderInput} from "../../graphql_queries/purchase_queries/CaptureOrder"
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';



function PurchaseConfirmation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');   
  const username = localStorage.getItem("username") 
  const [isLoading, setIsLoading] = useState(true)
  const [purchasedItems, setPurchasedItems] = useState([])

  captureOrderInput.inputs.token = token
  captureOrderInput.inputs.username = username

  const [mutate, { loading, error, data }] = useMutation(CAPTURE_ORDER);

  const CreateOrder = async () => {
    setIsLoading(true)
    try {
      console.log(captureOrderInput)
      const result = await mutate({
        variables: captureOrderInput
        ,
      });
      setIsLoading(false)
      console.log(result.data);
      setPurchasedItems(result.data.captureOrder.purchases)
    } catch (error) {
      console.error(error);
    }
  };  
  
  console.log(token)


  useEffect(()=>{CreateOrder()},[])
  return (
    <>
      {isLoading === true && <WaitingSpinner/>}
      {isLoading === false && <PurchasedComponentTable purchasedItems={purchasedItems}/>}    
    </>
    )
}

export default PurchaseConfirmation