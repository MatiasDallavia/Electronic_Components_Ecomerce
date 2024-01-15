import React from 'react'

function ProductCharacteristicRow({attribute, value}) {
  return (
    <tr>
        <td>{attribute}</td>
        <td>{value}</td>
    </tr>
  )
}

export default ProductCharacteristicRow