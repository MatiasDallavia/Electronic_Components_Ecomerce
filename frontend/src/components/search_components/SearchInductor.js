import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList';
import { GET_LIST_INDUCTORS, InductorListInput } from '../../graphql_queries/list_product_query/InductorListQuery';
import InductorFilter from './product_filters/InductorFilter';
import ErrorMessage from '../ErrorMessage';

import {fetchData} from "../../utils/fetchData"



function SearchInductor() {


  const [queryVariables, setQueryVariables] = useState(InductorListInput);
  const [inductors, setInductors] = useState([]);
  const [errorMesage, setErrorMessage] = useState("An error ocurred");


  useEffect(() => {
    getInductors();
  }, []); 

    const getInductors = async () => {
      try {
        console.log(queryVariables)
        const data = await fetchData(GET_LIST_INDUCTORS, queryVariables, setErrorMessage);
        setInductors(data.inductorsQuery);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage("An error occurred");
        console.log(errorMesage)
      }
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
      {errorMesage ?  <ProductList products={inductors} /> : <ErrorMessage error={errorMesage}/> }
    </div>
  )
}

export default SearchInductor