import React, { useState, useEffect } from 'react';
import { GET_LIST_DIODES, diodeListInput } from '../../graphql_queries/list_product_query/DiodeListQuery';
import DiodeFilter from './product_filters/DiodeFilter';
import ProductList from '../ProductList';

import {fetchData} from "../../utils/fetchData"


function SearchDiode() {


    const [queryVariables, setQueryVariables] = useState(diodeListInput);
    const [diodes, setDiodes] = useState([]);
    const [noDiodesFound, setNoDiodesFound] = useState(false)
  

    useEffect(() => {
      getDiodes();
    }, []); 
  
    const getDiodes = async () => {
      try {
        const data = await fetchData(GET_LIST_DIODES, queryVariables);
        if (data.diodesQuery.length === 0 ){
          setNoDiodesFound(true)
        } else{        
          setDiodes(data.diodesQuery);
          setNoDiodesFound(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    


  return (
    <div className="container filters g-3">
      <DiodeFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getDiodes}>
        Search
      </button>
      {
        noDiodesFound?
        <h3 id="no-result-title">
            No results were founds with the parameters given...
        </h3> :
              <ProductList products={diodes} />
      }  
    </div>
  )
}

export default SearchDiode