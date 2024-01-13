import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CapacitorFilter from './product_filters/CapacitorFilter';
import DiodeFilter from './product_filters/DiodeFilter';
import ResistorFilter from './product_filters/ResistorFilter';
import InductorFilter from './product_filters/InductorFilter';
import TransistorFilter from './product_filters/TransistorFilter';
import ProductList from './ProductList';
import { GET_INDUCTORS, InductorInput } from '../graphql_queries/InductorListQuery.js';
import { GET_CAPACITORS, capacitorInput } from '../graphql_queries/CapacitorListQuery.js';
import { GET_RESISTORS, ResistorInput } from '../graphql_queries/ResistorListQuery.js';
import { GET_TRANSISTORS, TransistorInput } from '../graphql_queries/TransistorListQuery.js';
import { GET_DIODES, diodeInput } from '../graphql_queries/DiodeListQuery.js';
import { useLazyQuery } from '@apollo/client';

function SearchProducts() {
  const { componentType } = useParams();
  let filter;
  let productInput;
  let PRODUCT_QUERY;

  const inputVariables = {
    resistors: ResistorInput,
    transistors: TransistorInput,
    capacitors: capacitorInput,
    inductors: InductorInput,
    diodes: diodeInput,
  }

  const [queryVariables, setQueryVariables] = useState(inputVariables[componentType]);

  switch (componentType) {
    case 'transistors':
      filter = <TransistorFilter />;
      PRODUCT_QUERY = GET_TRANSISTORS;
      productInput = TransistorInput;
      break;
    case 'resistors':
      filter = <ResistorFilter queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>;
      PRODUCT_QUERY = GET_RESISTORS;
      productInput = ResistorInput;
      break;
    case 'capacitors':
      filter = <CapacitorFilter />;
      PRODUCT_QUERY = GET_CAPACITORS;
      productInput = capacitorInput;
      break;
    case 'diodes':
      filter = <DiodeFilter />;
      PRODUCT_QUERY = GET_DIODES;
      productInput = diodeInput;
      break;
    case 'inductors':
      filter = <InductorFilter />;
      PRODUCT_QUERY = GET_INDUCTORS;
      productInput = InductorInput;
      break;
    default:
      filter = <TransistorFilter />;
      productInput = TransistorInput;
  }

  const [queryProducts, { loading, error, data }] = useLazyQuery(PRODUCT_QUERY);

  useEffect(() => {
    console.log("FIRST QUERY")
    // Realizar la consulta al cargar la página
    queryProducts({ variables: queryVariables });
  }, []);


  const handleSearch = () => {
    console.log("QUERY")
    console.log(queryVariables)
    queryProducts({ variables: queryVariables });
    console.log(error)
    console.log(data)
  };

  let products;

  switch (componentType) {
    case 'transistors':
      products = data ? data.transistorListQuery : [];
      break;
    case 'resistors':
      products = data ? data.resistorListQuery : [];
      break;
    case 'capacitors':
      products = data ? data.capacitorListQuery : [];
      break;
    case 'diodes':
      products = data ? data.diodeListQuery : [];
      break;
    case 'inductors':
      products = data ? data.inductorListQuery : [];
      break;
    default:
      products = data ? data.transistorListQuery : [];
  }

  return (
    <div className="container filters g-3">
      {filter}
      <button type="button" className="btn btn-primary submit" onClick={handleSearch}>
        Search
      </button>
      <ProductList products={products} />
    </div>
  );
}

export default SearchProducts;