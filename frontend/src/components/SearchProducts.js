import React from 'react'
import { useParams } from 'react-router-dom';
import CapacitorFilter from './product_filters/CapacitorFilter';
import DiodeFilter from './product_filters/DiodeFilter';
import ResistorFilter from './product_filters/ResistorFilter';
import InductorFilter from './product_filters/InductorFilter';
import TransistorFilter from './product_filters/TransistorFilter'
import ProductList from './ProductList';
import {GET_INDUCTORS, InductorInput} from '../graphql/InductorListQuery.js';
import { useQuery, gql } from '@apollo/client';





function SearchProducts() {


    let filter;
    const { componentType } = useParams();

    switch (componentType) {
        case 'transistors':
        filter = <TransistorFilter/>;
        break;
        case 'resistors':
        filter = <ResistorFilter/>;
        break;
        case 'capacitors':
        filter = <CapacitorFilter/>;
        break;
        case 'diodes':
        filter = <DiodeFilter/>;
        break;
        case 'inductors':
        filter = <InductorFilter/>;
        break;
        default:
        filter = <TransistorFilter/>;
            
    }

    const { loading, error, data } = useQuery(GET_INDUCTORS, {variables: InductorInput});
    console.log(loading)
    console.log("---------------------------")
    const products = data?.inductorListQuery
    console.log("$$$$$")
  
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;    
        
    return (
    
        <div class="container filters g-3">
            {filter}
            <button type="button" class="btn btn-primary submit">Search</button>
            <ProductList products={products} />
        </div>

  )
}

export default SearchProducts