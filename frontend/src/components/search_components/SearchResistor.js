import React, { useState, useEffect } from 'react';
import { GET_LIST_RESISTORS, ResistorListInput } from '../../graphql_queries/list_product_query/ResistorListQuery';
import ResistorFilter from './product_filters/ResistorFilter';
import ProductList from '../ProductList';

import {fetchData} from "../../utils/fetchData"


function SearchResistor() {


    const [queryVariables, setQueryVariables] = useState(ResistorListInput);
    const [resistors, setResistors] = useState([]);
    const [noResistorsFound, setNoResistorsFound] = useState(false)


  
    useEffect(() => {
      getResistors();
    }, []); 
  
    const getResistors = async () => {
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
    };
    

    
  return (
    <div className="container filters g-3">
      <ResistorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getResistors}>
        Search
      </button>
      {
        noResistorsFound?
        <h3 id="no-result-title">
            No results were founds with the parameters given...
        </h3> :
        <ProductList products={resistors} />
      }  
    </div>
  )
}

export default SearchResistor