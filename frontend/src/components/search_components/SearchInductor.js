import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList';
import { GET_LIST_INDUCTORS, InductorListInput } from '../../graphql_queries/list_product_query/InductorListQuery';
import InductorFilter from './product_filters/InductorFilter';

import {fetchData} from "../../utils/fetchData"



function SearchInductor() {


  const [queryVariables, setQueryVariables] = useState(InductorListInput);
  const [inductors, setInductors] = useState([]);
  const [noInductorsFound, setNoInductorsFound] = useState(false)


  useEffect(() => {
    getInductors();
  }, []); 

  const getInductors = async () => {
    try {
      console.log(queryVariables)
      const data = await fetchData(GET_LIST_INDUCTORS, queryVariables);
      if (data.inductorsQuery.length === 0 ){
        setNoInductorsFound(true)
      } else{        
        setInductors(data.inductorsQuery);
        setNoInductorsFound(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  return (
    <div className="container filters g-3">
      <InductorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button 
        type="button" 
        className="btn btn-primary submit" 
        onClick={()=>getInductors(GET_LIST_INDUCTORS,queryVariables)}
      >
        Search
      </button>
      {
        noInductorsFound?
        <h3 id="no-result-title">
            No results were founds with the parameters given...
        </h3> :
              <ProductList products={inductors} />
      }  
    </div>
  )
}

export default SearchInductor