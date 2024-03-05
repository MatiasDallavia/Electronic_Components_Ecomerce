import React, { useState, useEffect } from 'react';
import { GET_LIST_CAPACITORS, capacitorListInput } from '../../graphql_queries/list_product_query/CapacitorListQuery';
import CapacitorFilter from './product_filters/CapacitorFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"
import Paginator from './Paginator';

import {fetchData} from "../../utils/fetchData"


function SearchCapacitor() {

  const [isLoading, setIsLoading] = useState(false)
  const [queryVariables, setQueryVariables] = useState(capacitorListInput);
  const [capacitors, setCapacitors] = useState([]);
  const [noCapacitorFound, setNoCapacitorFound] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = capacitors.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    getCapacitors();
  }, []); 

  const getCapacitors = async () => {
    setCurrentPage(1)
    setIsLoading(true)
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
    setIsLoading(false)

  };

    
  return (
    <div className="container filters g-3">
      <CapacitorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getCapacitors}>
        Search
      </button>
      
      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noCapacitorFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ProductList products={currentItems} />
              <Paginator items={capacitors} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
          )}
        </>
      )}      
    </div>
  )
}

export default SearchCapacitor