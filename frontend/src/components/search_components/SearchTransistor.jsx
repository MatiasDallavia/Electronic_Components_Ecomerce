import React, { useState, useEffect } from 'react';
import { GET_LIST_TRANSISTORS, TransistorListInput } from '../../graphql_queries/list_product_query/TransistorListQuery';
import TransistorFilter from './product_filters/TransistorFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"

import {fetchData} from "../../utils/fetchData"


function SearchTransistor() {
  const [queryVariables, setQueryVariables] = useState(TransistorListInput);
  const [transistors, setTransistors] = useState([]);
  const [transistorType, setTransistorType] = useState('BJT');
  const [noTransistorsFound, setNoTransistorsFound] = useState(false) 
  const [isLoading, setIsLoading] = useState(false)

  const transistorTypeFilterChange = (transistorType) => {
    setTransistorType(transistorType);
    setQueryVariables((prevQueryVariables) => ({
      ...prevQueryVariables,
      inputs: {
        ...prevQueryVariables.inputs,
        "transistorType": transistorType,
      },
    }));
  };

  useEffect(() => {

    setNoTransistorsFound(false)     
    document.querySelector(".manufacturer").value = "ALL"
    document.querySelector(".model").value = ""
    getTransistors(true);
  }, [transistorType]);



  const getTransistors = async (resetQuery=null) => {
    setIsLoading(true)
    try {
      let transistorQueryVariables = queryVariables
      if (resetQuery){
        transistorQueryVariables.inputs.model = ""
        transistorQueryVariables.inputs.manufacturer = null      
      }
      const data = await fetchData(GET_LIST_TRANSISTORS, transistorQueryVariables);
      if (data.transistorsQuery.length === 0 ){
        setNoTransistorsFound(true)
      } else{
        setNoTransistorsFound(false)
        setTransistors(data.transistorsQuery);
      }      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false)
  };



  return (
    <div className="container filters g-3">
      <TransistorFilter
        transistorType={transistorType}
        transistorTypeFilterChange={transistorTypeFilterChange}
        queryVariables={queryVariables}
        setQueryVariables={setQueryVariables}
      />
      <button type="button" className="btn btn-primary submit" onClick={() => getTransistors(false)}>
        Search
      </button>
      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noTransistorsFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <ProductList products={transistors} />
          )}
        </>
      )}
    </div>
  );
}

export default SearchTransistor