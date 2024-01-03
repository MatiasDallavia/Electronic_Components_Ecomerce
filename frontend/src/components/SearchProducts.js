import React from 'react'
import { useParams } from 'react-router-dom';
import CapacitorFilter from './product_filters/CapacitorFilter';
import DiodeFilter from './product_filters/DiodeFilter';
import ResistorFilter from './product_filters/ResistorFilter';
import InductorFilter from './product_filters/InductorFilter';
import TransistorFilter from './product_filters/TransistorFilter'



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
        
    return (
    
        <div class="container filters g-3">
        {filter}
        <button type="button" class="btn btn-primary submit">Search</button>
        </div>

  )
}

export default SearchProducts