import React from 'react'

function ProductList() {
  return (
    <div class="container mt-5 mb-5">
      <div class="d-flex flex-column align-items-center">
        <table class="table table-hover product-table table-striped ta mb-5">
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

            <tr>
                <td class="product-characteristic image">
                    <img src="components/resistor2.jpeg" class="image-product"/>
                </td>
                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">
                    <img src="fairchild.png" class="image-product"/>
                </td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
            </tr>
            <tr>
                <td class="product-characteristic image">
                    <img src="components/zener.jpeg" class="image-product"/>
                </td>
                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">
                    <img src="texas_instruments.png" class="image-product"/>
                </td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
            </tr>
            <tr>
                <td class="product-characteristic image">
                    <img src="components/TO-92.webp" class="image-product"/>
                </td> 
                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">
                    <img src="infineon.png" class="image-product"/>
                </td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
            </tr>
            <tr>
                <td class="product-characteristic image">
                    <img src="components/TO-247.jpg" class="image-product"/>
                </td>
                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">
                    <img src="samsumg.png" class="image-product"/>
                </td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
            </tr>
            <tr>
                <td class="product-characteristic image">
                    <img src="components/TO-220.webp" class="image-product"/>
                </td>
                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">
                    <img src="siemens.png" class="image-product"/>
                </td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
            </tr>
            <tr>
                <td class="product-characteristic image">
                    <img src="components/diode.webp" class="image-product"/>
                </td>
                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">
                    <img src="siemens.png" class="image-product"/>
                </td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
            </tr>
            <tr>
                <td class="product-characteristic image">
                    <img src="components/diode2.webp" class="image-product"/>
                </td>                <td class="product-characteristic description">Otto</td>
                <td class="product-characteristic price">@mdo</td>
                <td class="product-characteristic in-stock">@mdo</td>
                <td class="product-characteristic package">package</td>
                <td class="product-characteristic manufacturer">@mdo</td>
                <td class="product-characteristic in-cart">
                    <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
                </td>
                                
            </tr>

        </tbody>
        </table>

        <nav>
                <ul class="pagination justify-content-end">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item"><a class="page-link" href="#">6</a></li>

                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
                </ul>
            </nav>
            <nav>
                <ul class="pagination justify-content-end">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">...</a></li>
                <li class="page-item active"><a class="page-link" href="#">5</a></li>
                <li class="page-item"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#">10</a></li>
                <li class="page-item"><a class="page-link" href="#">12</a></li>

                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
                </ul>
            </nav>
            <nav>
                <ul class="pagination justify-content-end">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item active"><a class="page-link" href="#">6</a></li>

                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Next</a>
                </li>
                </ul>
            </nav>
        </div>
    </div>    
  )
}

export default ProductList