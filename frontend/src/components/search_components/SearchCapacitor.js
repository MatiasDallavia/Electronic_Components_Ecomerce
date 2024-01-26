import React, { useState, useEffect } from 'react';
import { GET_LIST_CAPACITORS, capacitorListInput } from '../../graphql_queries/list_product_query/CapacitorListQuery';
import CapacitorFilter from './product_filters/CapacitorFilter';
import { useLazyQuery } from '@apollo/client';
import ProductList from '../ProductList';


function SearchCapacitor() {


  const [queryProducts, { loading, error, data }] = useLazyQuery(GET_LIST_CAPACITORS);
  const [queryVariables, setQueryVariables] = useState(capacitorListInput);
  const [capacitors, setcapacitors] = useState([]);



  useEffect(() => {

    // Realizar la consulta al cargar la página
    queryProducts({ variables: queryVariables });
  }, []);

  useEffect(() => {
    if (data) {
      console.log("DATA: ", data)
      setcapacitors(data.capacitorsQuery);
      console.log(capacitors)
    }
    
  }, [data]);


  const handleSearch = () => {
    queryProducts({ variables: queryVariables });
  };

    
  return (
    <div className="container filters g-3">
      <CapacitorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={capacitors} />
    </div>
  )
}

export default SearchCapacitor