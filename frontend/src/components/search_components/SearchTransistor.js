import React, { useState, useEffect } from 'react';
import { GET_LIST_TRANSISTORS, TransistorListInput } from '../../graphql_queries/list_product_query/TransistorListQuery';
import TransistorFilter from './product_filters/TransistorFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';

function SearchTransistor() {
  const [queryProducts, { loading, error, data }] = useLazyQuery(GET_LIST_TRANSISTORS);
  const [queryVariables, setQueryVariables] = useState(TransistorListInput);
  const [transistors, setTransistors] = useState([]);
  const [transistorType, setTransistorType] = useState('BJT');

  const transistorTypeFilterChange = (transistorType) => {
    setTransistorType(transistorType);
    setQueryVariables((prevQueryVariables) => ({
      ...prevQueryVariables,
      inputs: {
        ...prevQueryVariables.inputs,
        "transistorType": transistorType,
      },
    }));
  };

  useEffect(() => {

    // Realizar la consulta al cargar la página
    queryProducts({ variables: queryVariables });
    console.log("TYPE: ")
  }, [transistorType]);

  useEffect(() => {
    if (data) {
      setTransistors(data.transistorsQuery);
    }
    
  }, [data]);


  const handleSearch = () => {
    queryProducts({ variables: queryVariables });
  };


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
      <ProductList products={transistors} />
    </div>
  );
}

export default SearchTransistor