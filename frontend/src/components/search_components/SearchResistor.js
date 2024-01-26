import React, { useState, useEffect } from 'react';
import { GET_LIST_RESISTORS, ResistorListInput } from '../../graphql_queries/list_product_query/ResistorListQuery';
import ResistorFilter from './product_filters/ResistorFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';

function SearchResistor() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_LIST_RESISTORS);
    const [queryVariables, setQueryVariables] = useState(ResistorListInput);
    const [resistors, setresistors] = useState([]);
  

  
    useEffect(() => {
  
      // Realizar la consulta al cargar la página
      queryProducts({ variables: queryVariables });
    }, []);
  
    useEffect(() => {
      if (data) {
        setresistors(data.resistorsQuery);
        console.log(resistors)
      }
      
    }, [data]);
  
  
    const handleSearch = () => {
      queryProducts({ variables: queryVariables });
    };

    
  return (
    <div className="container filters g-3">
      <ResistorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={resistors} />
    </div>
  )
}

export default SearchResistor