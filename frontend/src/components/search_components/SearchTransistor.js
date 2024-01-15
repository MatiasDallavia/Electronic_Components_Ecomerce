import React, { useState, useEffect } from 'react';
import { GET_TRANSISTORS, TransistorInput } from '../../graphql_queries/list_query/TransistorListQuery';
import TransistorFilter from './product_filters/TransistorFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';

function SearchTransistor() {


    const [queryProducts, { loading, error, data }] = useLazyQuery(GET_TRANSISTORS);
    const [queryVariables, setQueryVariables] = useState(TransistorInput);

    const [transistorType, setTransistorType] = useState('BJT');

    const transistorTypeFilterChange = (transistorType) => {
        setTransistorType(transistorType)
        setQueryVariables((prevQueryVariables) => ({
            ...prevQueryVariables,
            inputs: {
            ...prevQueryVariables.inputs,
            "transistorType" : transistorType
            }
        }));
      }
    

    useEffect(() => {
      console.log("FIRST QUERY")
      // Realizar la consulta al cargar la página
      queryProducts({ variables: queryVariables });
      console.log(error);
      console.log(data);
    }, [transistorType]);
    
  
    const handleSearch = () => {
      console.log("QUERY")
      console.log(queryVariables)
      queryProducts({ variables: queryVariables });
      console.log(error)
      console.log(data)
    };    

    const products = data ? data.transistorListQuery : [];
    console.log(products)
  return (
    <div className="container filters g-3">
      <TransistorFilter 
            transistorType={transistorType}
            transistorTypeFilterChange={transistorTypeFilterChange}
            queryVariables={queryVariables} 
            setQueryVariables={setQueryVariables}
        />
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={products} />
    </div>
  )
}

export default SearchTransistor