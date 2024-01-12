import React from 'react'
import { useParams } from 'react-router-dom';
import CapacitorFilter from './product_filters/CapacitorFilter';
import DiodeFilter from './product_filters/DiodeFilter';
import ResistorFilter from './product_filters/ResistorFilter';
import InductorFilter from './product_filters/InductorFilter';
import TransistorFilter from './product_filters/TransistorFilter'
import ProductList from './ProductList';
import {GET_INDUCTORS, InductorInput} from '../graphql_queries/InductorListQuery.js';
import {GET_CAPACITORS, capacitorInput} from '../graphql_queries/CapacitorListQuery.js';
import {GET_RESISTORS, ResistorInput} from '../graphql_queries/ResistorListQuery.js';
import {GET_TRANSISTORS, TransistorInput} from '../graphql_queries/TransistorListQuery.js';
import {GET_DIODES, diodeInput} from '../graphql_queries/DiodeListQuery.js';

import { useQuery, gql } from '@apollo/client';





function SearchProducts() {
    const { componentType } = useParams();
    let filter;
    let queryInput;
    let PRODUCT_QUERY;

    switch (componentType) {
        case 'transistors':
            filter = <TransistorFilter />;
            PRODUCT_QUERY = GET_TRANSISTORS;
            queryInput = TransistorInput;
            break;
        case 'resistors':
            filter = <ResistorFilter />;
            PRODUCT_QUERY = GET_RESISTORS;
            queryInput = ResistorInput;
            break;
        case 'capacitors':
            filter = <CapacitorFilter />;
            PRODUCT_QUERY = GET_CAPACITORS;
            queryInput = capacitorInput;
            break;
        case 'diodes':
            filter = <DiodeFilter />;
            PRODUCT_QUERY = GET_DIODES;
            queryInput = diodeInput;
            break;
        case 'inductors':
            filter = <InductorFilter />;
            PRODUCT_QUERY = GET_INDUCTORS;
            queryInput = InductorInput;
            
            break;
        default:
            filter = <TransistorFilter />;
            queryInput = TransistorInput;
    }

    const { loading, error, data } = useQuery(PRODUCT_QUERY, { variables: queryInput });
    console.log(data)
    console.log(error)
    console.log("---------------------------")
    console.log("$$$$$")
  
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;  
    
    let products;

    switch (componentType) {
        case 'transistors':
            products = data?.transistorListQuery
            break;
        case 'resistors':
            products = data?.resistorListQuery
            break;
        case 'capacitors':
            products = data?.capacitorListQuery
            break;
        case 'diodes':
            products = data?.diodeListQuery
            break;
        case 'inductors':

            products = data?.inductorListQuery
            break;
        default:
            products = data?.transistorListQuery

    }    
        
    return (
    
        <div class="container filters g-3">
            {filter}
            <button type="button" class="btn btn-primary submit">Search</button>
            <ProductList products={products} />
        </div>

  )
}

export default SearchProducts