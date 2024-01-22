import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PurchasedComponentTable from './PurchasedComponentTable';
import WaitingSpinner from './WaitingSpinner';


function PurchaseConfirmation() {
  const { token } = useParams();
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