import React, { useState, useEffect } from 'react';
import { GET_LIST_RESISTORS, ResistorListInput } from '../../graphql_queries/list_product_query/ResistorListQuery';
import ResistorFilter from './product_filters/ResistorFilter';
import ProductList from '../ProductList';

import {fetchData} from "../../utils/fetchData"


function SearchResistor() {


    const [queryVariables, setQueryVariables] = useState(ResistorListInput);
    const [resistors, setResistors] = useState([]);
  

  
    useEffect(() => {
      getResistors();
    }, []); 
  
    const getResistors = async () => {
      try {
        console.log(queryVariables)
        const data = await fetchData(GET_LIST_RESISTORS, queryVariables);
        setResistors(data.resistorsQuery);
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
      <ProductList products={resistors} />
    </div>
  )
}

export default SearchResistor