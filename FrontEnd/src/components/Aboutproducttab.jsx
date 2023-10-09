import React from 'react'

const Aboutproducttab = (product) => {
  let productDetails = JSON.stringify(product)
  let productDetail = JSON.parse(productDetails).product
  console.log('productDetails', JSON.parse(productDetails).product)
  return (
    <>
    <div className='aboutproducttab'>
        <div className='row prd-info'>
            <div className='col-6'>
             
<table class="table">
 
  <tbody>
    <tr>
      <th scope="row">Product Name</th>
      <td> {productDetail?.name}</td>
     
    </tr>
    <tr>
      <th scope="row">Brand</th>
      <td>Nike, Nike Z</td>
      
    </tr>
    <tr>
      <th scope="row">Category</th>
      <td>{productDetail.category?.name}</td>
      
    </tr>
    <tr>
      <th scope="row">Weight</th>
      <td>{productDetail?.weight? productDetail?.weight: 50} kg</td>
    </tr>
  </tbody>
</table>
            </div>

            {/* NEW COLUMNS */}

            <div className='col-6'>
            <table class="table">
 
 <tbody>
   <tr>
     <th scope="row">Height</th>
     <td>{productDetail?.height? productDetail?.height: 100} cm</td>
  
   </tr>
   {/* <tr>
     <th scope="row">Brand</th>
     <td>Nike, Nike Z</td>
     
   </tr>
   <tr>
     <th scope="row">Product Name</th>
     <td>Sketch Stripe Yellow Joggs</td>
    
   </tr> */}
 
   
 </tbody>
</table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Aboutproducttab