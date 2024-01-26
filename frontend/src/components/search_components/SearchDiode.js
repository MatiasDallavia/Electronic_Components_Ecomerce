import React, { useState, useEffect } from 'react';
import { GET_LIST_DIODES, diodeListInput } from '../../graphql_queries/list_product_query/DiodeListQuery';
import DiodeFilter from './product_filters/DiodeFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';


function SearchDiode() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_LIST_DIODES);
    const [queryVariables, setQueryVariables] = useState(diodeListInput);
    const [diodes, setdiodes] = useState([]);
  

  
    useEffect(() => {
  
      // Realizar la consulta al cargar la página
      queryProducts({ variables: queryVariables });
    }, []);
  
    useEffect(() => {
      if (data) {
        setdiodes(data.diodesQuery);
        console.log(diodes)
      }
      
    }, [data]);
  
  
    const handleSearch = () => {
      queryProducts({ variables: queryVariables });
    };


  return (
    <div className="container filters g-3">
      <DiodeFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={diodes} />
    </div>
  )
}

export default SearchDiode