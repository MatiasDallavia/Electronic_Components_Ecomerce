import React from 'react'

function ErrorMessage({error}) {
  return (
    <div className="alert alert-danger m-3" role="alert">
      {error}
    </div> 
   )
}

export default ErrorMessage