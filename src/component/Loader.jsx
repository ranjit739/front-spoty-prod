import React from 'react'

const Loader = () => {
  return (
    <>
  
<div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
<div className="text-center">
  <div className="spinner-grow me-2" role="status"></div>
  <div className="spinner-grow me-2" role="status"></div>
  <div className="spinner-grow" role="status"></div>
  <h5 className="mt-3">Loading, please wait...</h5>
</div>
</div>
  
</>
  )
}

export default Loader

