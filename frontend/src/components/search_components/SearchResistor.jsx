import React, { useState, useEffect } from 'react';
import { GET_LIST_RESISTORS, ResistorListInput } from '../../graphql_queries/list_product_query/ResistorListQuery';
import ResistorFilter from './product_filters/ResistorFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"
import Paginator from './Paginator';


import {fetchData} from "../../utils/fetchData"


function SearchResistor() {

    const [isLoading, setIsLoading] = useState(false)
    const [queryVariables, setQueryVariables] = useState(ResistorListInput);
    const [resistors, setResistors] = useState([]);
    const [noResistorsFound, setNoResistorsFound] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = resistors.slice(indexOfFirstItem, indexOfLastItem);  

  
    useEffect(() => {
      getResistors();
    }, []); 
  
    const getResistors = async () => {
      setIsLoading(true)
      try {
        const data = await fetchData(GET_LIST_RESISTORS, queryVariables);
        if (data.resistorsQuery.length === 0 ){
          setNoResistorsFound(true)
        } else{        
          setResistors(data.resistorsQuery);
          setNoResistorsFound(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false)
    };
    
    
  return (
    <div className="container filters g-3">
      <ResistorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>
      <button type="button" className="btn btn-primary submit" onClick={getResistors}>
        Search
      </button>

      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noResistorsFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ProductList products={currentItems} />
              <Paginator items={resistors} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default SearchResistor