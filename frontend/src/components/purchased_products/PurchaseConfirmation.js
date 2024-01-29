import React from 'react'
import PurchasedComponentTable from './PurchasedComponentTable';
import WaitingSpinner from './WaitingSpinner';
import { useLocation } from 'react-router-dom';
import {CAPTURE_ORDER, captureOrderInput} from "../../graphql_queries/purchase_queries/CaptureOrder"
import { useEffect, useState } from 'react';

import {fetchData} from "../../utils/fetchData"
import { getJWT } from '../../utils/token';



function PurchaseConfirmation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');   
  const username = localStorage.getItem("username") 
  const [isLoading, setIsLoading] = useState(true)
  const [purchasedItems, setPurchasedItems] = useState([])

  captureOrderInput.inputs.token = token
  captureOrderInput.inputs.username = username



  const captureOrderMutation = async () => {
    try {
      setIsLoading(true)
      const token = await getJWT()
      const data = await fetchData(CAPTURE_ORDER, captureOrderInput, token);
      setIsLoading(false)
      setPurchasedItems(data.captureOrder.purchases)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  
  console.log(token)


  useEffect(()=>{captureOrderMutation()},[])
  return (
    <>
      {isLoading === true && <WaitingSpinner/>}
      {isLoading === false && <PurchasedComponentTable purchasedItems={purchasedItems}/>}    
    </>
    )
}

export default PurchaseConfirmation