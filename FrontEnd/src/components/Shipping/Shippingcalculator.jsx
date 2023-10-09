import React from 'react'

const Shippingcalculator = () => {
  return (
    <div className='shippingcalculator'>
        <div className='shippingcalculator-widget container'>
            <h2>Shipping Calculator by ZECODO</h2>
            <div className='row'>
                <div className='col-6'>
                    <h3>
                    Delivery Details
                    </h3>
                    <div className='select-input-shipping'>
                        <label>
                        Select Item Category<br></br>
                        <select>
                         
                            <option selected>Shoes</option>
                            <option selected>Brands</option>
                        </select>
                        </label>
                        <label>
                        Choose Destination <br></br>
                        <select>
                            
                            <option selected>Shoes</option>
                            <option selected>Brands</option>
                        </select>
                        </label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='parcelsize'>
                                <h3>Parcel Size</h3>
                                <div className='length-cm'>
                                    <label>Length (cm)
                                    <br/>
                                    <input type="text" /></label>
                                    <br />
                                    <label>Width (cm)<br/>
                                    <input type="text" /></label>
                                    <br />
                                    <label>Height (cm)<br/>
                                    <input type="text" /></label>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 align-self-center'>
                            <div className='reset-shippingbutton'>
                                <a href="#"><button style={{backgroundColor: "#fff", color: "#818181"}}>Reset</button></a>
                                <br/>
                                <a href="#"><button style={{backgroundColor: "#F9B300", color: "#fff"}}>Get The Estimation</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shippingcalculator