import React, { useState, useEffect } from 'react';
import { GET_LIST_CAPACITORS, capacitorListInput } from '../../graphql_queries/list_product_query/CapacitorListQuery';
import CapacitorFilter from './product_filters/CapacitorFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"

import {fetchData} from "../../utils/fetchData"


function SearchCapacitor() {

  const [isLoading, setIsLoading] = useState(false)
  const [queryVariables, setQueryVariables] = useState(capacitorListInput);
  const [capacitors, setCapacitors] = useState([]);
  const [noCapacitorFound, setNoCapacitorFound] = useState(false)




  useEffect(() => {
    getCapacitors();
  }, []); 

  const getCapacitors = async () => {
    setIsLoading(true)
    try {
      const data = await fetchData(GET_LIST_CAPACITORS, queryVariables);
      if (data.capacitorsQuery.length === 0 ){
        setNoCapacitorFound(true)
      } else{
        setNoCapacitorFound(false)
        setCapacitors(data.capacitorsQuery);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false)

  };

    
  return (
    <div className="container filters g-3">
      <CapacitorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getCapacitors}>
        Search
      </button>
      
      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noCapacitorFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <ProductList products={capacitors} />
          )}
        </>
      )}      
    </div>
  )
}

export default SearchCapacitor