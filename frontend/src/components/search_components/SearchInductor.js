import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';
import { GET_LIST_INDUCTORS, InductorListInput } from '../../graphql_queries/list_product_query/InductorListQuery';
import InductorFilter from './product_filters/InductorFilter';



function SearchInductor() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_LIST_INDUCTORS);
    const [queryVariables, setQueryVariables] = useState(InductorListInput);


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

    const products = data ? data.inductorListQuery : [];
    
  return (
    <div className="container filters g-3">
      <InductorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={products} />
    </div>
  )
}

export default SearchInductor