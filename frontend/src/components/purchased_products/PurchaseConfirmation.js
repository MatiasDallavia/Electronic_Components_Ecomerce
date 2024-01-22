import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PurchasedComponentTable from './PurchasedComponentTable';
import WaitingSpinner from './WaitingSpinner';
import { useLocation } from 'react-router-dom';



function PurchaseConfirmation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');    

  console.log(token)
  let loading = true 
  return (
    <>
      {loading === true && <WaitingSpinner/>}
      {loading === false && <PurchasedComponentTable/>}    
    </>
    )
}

export default PurchaseConfirmation