import React from 'react'
import Seller1 from '../Images/Productimages/productinfoseller/1.png'
import Seller2 from '../Images/Productimages/productinfoseller/2.png'
import Seller3 from '../Images/Productimages/productinfoseller/3.png'
import Seller4 from '../Images/Productimages/productinfoseller/4.png'

const Productinfoseller = () => {
  return (
    <>
    <div className='row product-info-seller'>
        <img src={Seller1} width="auto" />
        <img src={Seller2} width="auto" />
        <img src={Seller3} width="auto" />
        <img src={Seller4} width="auto" />
    </div>
    </>
  )
}

export default Productinfoseller