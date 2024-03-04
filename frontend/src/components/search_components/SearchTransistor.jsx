import React, { useState, useEffect } from 'react';
import { GET_LIST_TRANSISTORS, TransistorListInput } from '../../graphql_queries/list_product_query/TransistorListQuery';
import TransistorFilter from './product_filters/TransistorFilter';
import ProductList from '../ProductList';
import  WaitingSpinner  from "../purchased_products/WaitingSpinner"
import Paginator from './Paginator';

import {fetchData} from "../../utils/fetchData"


function SearchTransistor() {



  
  //query
  const [queryVariables, setQueryVariables] = useState(TransistorListInput);
  const [transistors, setTransistors] = useState([]);
  const [transistorType, setTransistorType] = useState('BJT');
  const [noTransistorsFound, setNoTransistorsFound] = useState(false) 
  const [isLoading, setIsLoading] = useState(false)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transistors.slice(indexOfFirstItem, indexOfLastItem);  

  const transistorTypeFilterChange = (transistorType) => {
    setCurrentPage(1)
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

    setNoTransistorsFound(false)     
    document.querySelector(".manufacturer").value = "ALL"
    document.querySelector(".model").value = ""
    getTransistors(true);
  }, [transistorType]);



  const getTransistors = async (resetQuery=null) => {
    setIsLoading(true)
    try {
      let transistorQueryVariables = queryVariables
      if (resetQuery){
        transistorQueryVariables.inputs.model = ""
        transistorQueryVariables.inputs.manufacturer = null      
      }
      const data = await fetchData(GET_LIST_TRANSISTORS, transistorQueryVariables);
      if (data.transistorsQuery.length === 0 ){
        setNoTransistorsFound(true)
      } else{
        setNoTransistorsFound(false)
        setTransistors(data.transistorsQuery);
      }      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false)
  };



  return (
    <div className="container filters g-3">
      <TransistorFilter
        transistorType={transistorType}
        transistorTypeFilterChange={transistorTypeFilterChange}
        queryVariables={queryVariables}
        setQueryVariables={setQueryVariables}
      />
      <button type="button" className="btn btn-primary submit" onClick={() => getTransistors(false)}>
        Search
      </button>
      {isLoading === true && <WaitingSpinner />}
      {!isLoading && (
        <>
          {noTransistorsFound ? (
            <h3 id="no-result-title">
              No results were found with the parameters given...
            </h3>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ProductList products={currentItems} />
              <Paginator items={transistors} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchTransistor