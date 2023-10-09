import React from 'react'
import Womenshippingimage from '../../Images/Shipping/1.png'

const Shippingbanners = () => {
  return (
    <>
    <div className='shippingbanner'>
        <div className='container'>
        <div className='row'>
            <div className='col-7'>
                <h1><span>WE DELIVER</span><br /><strong>WITH <b>SPEED</b></strong></h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
                     enim ad minim veniam, quis nostrud exerci</p>
            </div>
            <div className='col-5'>
                <img src={Womenshippingimage} width='100%' />
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Shippingbanners