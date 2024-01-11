import React from 'react'
import Table from 'react-bootstrap/Table';
import ProductTableRow from './ProductTableRow';
import Paginatior from './Paginatior';




function ProductList({products}) {


  return (

    <div className="container d-flex flex-column align-items-center">
        <Table bordered hover product-table id="products-table">
        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Units Available</th>
                <th scope="col">Package</th>
                <th scope="col">Manufacturer</th>
                <th scope="col">In Cart</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (

              <ProductTableRow product={product}/>

            ))}
   
        </tbody>
        </Table>


        <Paginatior/>

    </div>    
  )
}

export default ProductList