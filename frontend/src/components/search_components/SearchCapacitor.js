import React, { useState, useEffect } from 'react';
import { GET_LIST_CAPACITORS, capacitorListInput } from '../../graphql_queries/list_product_query/CapacitorListQuery';
import CapacitorFilter from './product_filters/CapacitorFilter';
import ProductList from '../ProductList';

import {fetchData} from "../../utils/fetchData"


function SearchCapacitor() {

  const [queryVariables, setQueryVariables] = useState(capacitorListInput);
  const [capacitors, setCapacitors] = useState([]);
  const [noCapacitorFound, setNoCapacitorFound] = useState(false)




  useEffect(() => {
    getCapacitors();
  }, []); 

  const getCapacitors = async () => {
    try {
      const data = await fetchData(GET_LIST_CAPACITORS, queryVariables);
      if (data.capacitorsQuery.length === 0 ){
        setNoCapacitorFound(true)
      } else{
        setNoCapacitorFound(false)
        setCapacitors(data.capacitorsQuery);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    
  return (
    <div className="container filters g-3">
      <CapacitorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getCapacitors}>
        Search
      </button>
      
      {
        noCapacitorFound?
        <h3 id="no-result-title">
            No results were founds with the parameters given...
        </h3> :
              <ProductList products={capacitors} />
      }      
    </div>
  )
}

export default SearchCapacitor