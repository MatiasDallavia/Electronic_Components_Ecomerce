import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList';
import { GET_LIST_INDUCTORS, InductorListInput } from '../../graphql_queries/list_product_query/InductorListQuery';
import InductorFilter from './product_filters/InductorFilter';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"
import Paginator from './Paginator';

import {fetchData} from "../../utils/fetchData"



function SearchInductor() {

  const [isLoading, setIsLoading] = useState(false)
  const [queryVariables, setQueryVariables] = useState(InductorListInput);
  const [inductors, setInductors] = useState([]);
  const [noInductorsFound, setNoInductorsFound] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inductors.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getInductors();
  }, []); 

  const getInductors = async () => {
    setIsLoading(true)
    try {
      const data = await fetchData(GET_LIST_INDUCTORS, queryVariables);
      if (data.inductorsQuery.length === 0 ){
        setNoInductorsFound(true)
      } else{        
        setInductors(data.inductorsQuery);
        setNoInductorsFound(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false)
  };
  


  return (
    <div className="container filters g-3">
      <InductorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button 
        type="button" 
        className="btn btn-primary submit" 
        onClick={()=>getInductors(GET_LIST_INDUCTORS,queryVariables)}
      >
        Search
      </button>
      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noInductorsFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ProductList products={currentItems} />
              <Paginator items={inductors} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
            )}
        </>
      )}   
    </div>
  )
}

export default SearchInductor