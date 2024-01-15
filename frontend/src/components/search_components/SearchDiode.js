import React, { useState, useEffect } from 'react';
import { GET_DIODES, diodeInput } from '../../graphql_queries/list_query/DiodeListQuery';
import DiodeFilter from './product_filters/DiodeFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';

console.log(GET_DIODES)

function SearchDiode() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_DIODES);
    const [queryVariables, setQueryVariables] = useState(diodeInput);


    useEffect(() => {
      console.log("FIRST QUERY")
      // Realizar la consulta al cargar la página
      queryProducts({ variables: queryVariables });
      console.log(error);
      console.log(data);
    }, []);
    
  
    const handleSearch = () => {
      console.log("QUERY")
      console.log(queryVariables)
      queryProducts({ variables: queryVariables });
      console.log(error)
      console.log(data)
    };    

    const products = data ? data.diodeListQuery : [];
    
  return (
    <div className="container filters g-3">
      <DiodeFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={products} />
    </div>
  )
}

export default SearchDiode