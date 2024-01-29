import React, { useState, useEffect } from 'react';
import { GET_LIST_TRANSISTORS, TransistorListInput } from '../../graphql_queries/list_product_query/TransistorListQuery';
import TransistorFilter from './product_filters/TransistorFilter';
import ProductList from '../ProductList';

import {fetchData} from "../../utils/fetchData"


function SearchTransistor() {
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
    getTransistors();
  }, [transistorType]);

  useEffect(() => {
    getTransistors();
  }, []); 

  const getTransistors = async () => {
    try {
      console.log(queryVariables)
      const data = await fetchData(GET_LIST_TRANSISTORS, queryVariables);
      setTransistors(data.transistorsQuery);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div className="container filters g-3">
      <TransistorFilter
        transistorType={transistorType}
        transistorTypeFilterChange={transistorTypeFilterChange}
        queryVariables={queryVariables}
        setQueryVariables={setQueryVariables}
      />
      <button type="button" className="btn btn-primary submit" onClick={getTransistors}>
        Search
      </button>
      <ProductList products={transistors} />
    </div>
  );
}

export default SearchTransistor