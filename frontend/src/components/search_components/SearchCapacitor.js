import React, { useState, useEffect } from 'react';
import { GET_CAPACITORS, capacitorInput } from '../../graphql_queries/list_query/CapacitorListQuery';
import CapacitorFilter from './product_filters/CapacitorFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';


function SearchCapacitor() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_CAPACITORS);
    const [queryVariables, setQueryVariables] = useState(capacitorInput);


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

    const products = data ? data.capacitorListQuery : [];
    
  return (
    <div className="container filters g-3">
      <CapacitorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={products} />
    </div>
  )
}

export default SearchCapacitor