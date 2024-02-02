import React, { useState, useEffect } from 'react';
import { GET_LIST_RESISTORS, ResistorListInput } from '../../graphql_queries/list_product_query/ResistorListQuery';
import ResistorFilter from './product_filters/ResistorFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"


import {fetchData} from "../../utils/fetchData"


function SearchResistor() {

    const [isLoading, setIsLoading] = useState(false)
    const [queryVariables, setQueryVariables] = useState(ResistorListInput);
    const [resistors, setResistors] = useState([]);
    const [noResistorsFound, setNoResistorsFound] = useState(false)


  
    useEffect(() => {
      getResistors();
    }, []); 
  
    const getResistors = async () => {
      setIsLoading(true)
      try {
        const data = await fetchData(GET_LIST_RESISTORS, queryVariables);
        if (data.resistorsQuery.length === 0 ){
          setNoResistorsFound(true)
        } else{        
          setResistors(data.resistorsQuery);
          setNoResistorsFound(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false)
    };
    
    
  return (
    <div className="container filters g-3">
      <ResistorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getResistors}>
        Search
      </button>

      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noResistorsFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <ProductList products={resistors} />
          )}
        </>
      )}

    </div>
  )
}

export default SearchResistor