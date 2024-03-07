import React from 'react'
import PurchasesHistoryTable from './PurchasesHistoryTable';
import WaitingSpinner from './WaitingSpinner';
import { useLocation } from 'react-router-dom';
import {GET_USER_PURCHASES} from "../../graphql_queries/purchase_queries/PurchaseHistory"
import { useEffect, useState } from 'react';

import {fetchData} from "../../utils/fetchData"
import { getJWT } from '../../utils/token';



function PurchaseHistory() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');   
  const username = localStorage.getItem("username") 
  const [isLoading, setIsLoading] = useState(true)
  const [purchasedItems, setPurchasedItems] = useState([])



  const captureOrderMutation = async () => {
    try {
      setIsLoading(true)
      const token = await getJWT()
      console.log(token);
      const data = await fetchData(GET_USER_PURCHASES, null ,token);
      console.log(data);
      setIsLoading(false)
      setPurchasedItems(data.userPurchasedItems)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{captureOrderMutation()},[])
  return (
    <>
      {isLoading === true && <WaitingSpinner/>}
      {isLoading === false && <PurchasesHistoryTable purchasedItems={purchasedItems}/>}    
    </>
    )
}

export default PurchaseHistory