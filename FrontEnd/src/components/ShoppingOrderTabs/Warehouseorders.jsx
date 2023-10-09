import React from 'react'
import Productimage from '../../Images/userimages/myshoppingorders/paymentpending/product.png'
import Productimage1 from '../../Images/userimages/myshoppingorders/paymentpending/product1.png'
import Productconfirmation from './Productconfirmation'
import '../../assets/js/main'
const Warehouseorders = () => {
  return (
    <>
    <div className='paymentpending'>
       
        <table id='paymentpending-table'>
            <tr className='firstrow'>
                <th>Item Details</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Logistics Status</th>
                <th>Actions Required</th>
            </tr>

            <tr>
                <td><div className='product-listing'>
                    <img src={Productimage} />
                    <div className='product-info'>
                        <h2>
                        Order #ID: 15s5d8e1
                        </h2>
                        <h3>Adidas Originals Men's Stan Smith<br/> Kris Andrew Pride Sneaker Cream US 7 </h3>
                        <p>Product ID#GX6394</p>
                    </div>
                </div></td>
                <td width= "8%">$ 54.63</td>
                <td>1</td>
                <td><a className='atwarehouse' href="#"><button style={{backgroundColor: "#41FF76"}}>At Warehouse</button></a></td>
                <td><a className='paid' href="#"><button style={{backgroundColor: "#00F444"}}>Paid</button></a></td>
                <td><a className='viewdetails' href="#">View Details</a></td>
                <td className='verify-order '><a href="#" className='modal-link'>
                <button className='' style={{backgroundColor: "#F9B300", color: "#373737"}}>Verify Order</button></a></td>
            </tr>
        </table>
    </div>
   
    <div id="custom-modal" class="custom-modal">
        <div class="custom-modal-dialog">
            <div class="custom-modal-content">
               <span class="close-modal">X</span>
                <div class="custom-modal-body">
                    <div class="custom-modal-inner">
                        <div className='confirmed-product'>
                            <table>
                                <tr>
                                    <td>
                                        <div className='image-text'>
                                            <div className='image'>
                                        <img src={Productimage} />
                                        </div>
                                        <div className='product-info'>
                                        <h3>Order #ID: 15s5d8e1</h3>
                                        <h2>Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 </h2>
                                        <h6>$ 54.63</h6>
                                        <p>Product ID#GX6394</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h3>Quantity</h3>
                                        <h5>1</h5>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className='arrived-product'>
                            <h3>Arrived Product Images</h3>
                            <div className='row'>
                                <div className='col'>
                                    <img src={Productimage} />
                                </div>
                                <div className='col'>
                                    <img src={Productimage} />
                                </div>
                                <div className='col'>
                                    <img src={Productimage} />
                                </div>
                            </div>
                        </div>
                        <div className='button-iconfirm'
                        style={{padding: "30px 0px"}}
                        >
                            <a href="#">This is Not What i’ve ordered</a>
                            <a href="#"><button>I Confirm</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Warehouseorders