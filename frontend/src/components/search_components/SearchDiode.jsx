import React, { useState, useEffect } from 'react';
import { GET_LIST_DIODES, diodeListInput } from '../../graphql_queries/list_product_query/DiodeListQuery';
import DiodeFilter from './product_filters/DiodeFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"
import Paginator from './Paginator';

import {fetchData} from "../../utils/fetchData"


function SearchDiode() {


    const [isLoading, setIsLoading] = useState(false)
    const [queryVariables, setQueryVariables] = useState(diodeListInput);
    const [diodes, setDiodes] = useState([]);
    const [noDiodesFound, setNoDiodesFound] = useState(false)
  
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = diodes.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
      getDiodes();
    }, []); 
  
    const getDiodes = async () => {
      setCurrentPage(1)
      setIsLoading(true)
      try {
        const data = await fetchData(GET_LIST_DIODES, queryVariables);
        if (data.diodesQuery.length === 0 ){
          setNoDiodesFound(true)
        } else{        
          setDiodes(data.diodesQuery);
          setNoDiodesFound(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false)
    };
    


  return (
    <div className="container filters g-3">
      <DiodeFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getDiodes}>
        Search
      </button>
      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noDiodesFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ProductList products={currentItems} />
              <Paginator items={diodes} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
          )}
        </>
      )}  
    </div>
  )
}

export default SearchDiode