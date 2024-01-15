import React, { useState, useEffect } from 'react';
import { GET_RESISTORS, ResistorInput } from '../../graphql_queries/ResistorListQuery';
import ResistorFilter from './product_filters/ResistorFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';

function SearchResistor() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_RESISTORS);
    const [queryVariables, setQueryVariables] = useState(ResistorInput);


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

    const products = data ? data.resistorListQuery : [];
    
  return (
    <div className="container filters g-3">
      <ResistorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={products} />
    </div>
  )
}

export default SearchResistor