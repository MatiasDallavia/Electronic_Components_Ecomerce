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
                <th className="title" scope="col">Product</th>
                <th className="title"  scope="col">Description</th>
                <th className="title"  scope="col">Price</th>
                <th className="" scope="col">Units Available</th>
                <th className="" scope="col">Mounting Technology</th>
                <th className="" scope="col">Package</th>
                <th className="" scope="col">Manufacturer</th>
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