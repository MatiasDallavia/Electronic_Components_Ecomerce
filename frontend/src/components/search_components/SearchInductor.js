import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';
import { GET_LIST_INDUCTORS, InductorListInput } from '../../graphql_queries/list_product_query/InductorListQuery';
import InductorFilter from './product_filters/InductorFilter';



function SearchInductor() {


  const [queryProducts, { loading, error, data }] = useLazyQuery(GET_LIST_INDUCTORS);
  const [queryVariables, setQueryVariables] = useState(InductorListInput);
  const [inductors, setInductors] = useState([]);



  useEffect(() => {

    // Realizar la consulta al cargar la página
    queryProducts({ variables: queryVariables });
  }, []);

  useEffect(() => {
    if (data) {
      setInductors(data.inductorsQuery);
      console.log(inductors)
    }
    
  }, [data]);


  const handleSearch = () => {
    queryProducts({ variables: queryVariables });
  };

  return (
    <div className="container filters g-3">
      <InductorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={inductors} />
    </div>
  )
}

export default SearchInductor