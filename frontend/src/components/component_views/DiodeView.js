import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_DIODE, singleDiodeInput } from '../../graphql_queries/single_product_query/SingleDiodeQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';



function DiodeView() {

  const { componentModel } = useParams();
  console.log("params: ",componentModel)
  singleDiodeInput.inputs.id = 10 
  const { loading, error, data } = useQuery(GET_SINGLE_DIODE, {singleDiodeInput});
  console.log(data)
  const diode = data ? data.diodeListQuery : [];
  console.log(diode)
  console.log(error)

  return (
    <div class="container pt-5">

        <div class="row">
        <div class="col-4" >
            
                <div class="container d-flex flex-column align-items-center justify-content-between main-attributes">
                        <div>
                        <img id="cover-image-product" src="..."/>

                        <table>
                            <tr>
                            <td>Model</td>
                            <th>1N706A</th>
                            </tr>
                            <tr>
                            <td>Price</td>
                            <td>$100</td>
                            </tr>
                            <tr>
                            <td>Product Type</td>
                            <td>Zener Diode</td>
                            </tr>
                            <tr>
                            <td>Units Available</td>
                            <td>$300</td>
                            </tr>
                            <tr>
                            <td>Brown</td>
                            <td>$250</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <label class=" d-flex flex-column align-items-center">Added to cart !</label>
                        <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
                    </div>
                </div>
        </div>
        <div class="col-8">
            <table class="table table-no-hover table-no-border table-striped product-attributes">
                <thead>
                <tr class="table-dark">
                    <th scope="col" colspan="2">Product Attributes</th>
                </tr>
                </thead>
                <tbody>
                    <ProductCharacteristicRow attribute={23} value={23}/>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default DiodeView