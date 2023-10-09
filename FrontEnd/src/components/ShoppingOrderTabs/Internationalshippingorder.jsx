import React from 'react'
import Productimage from '../../Images/userimages/myshoppingorders/paymentpending/product.png'
import Myaddressandoffice from '../Myaddressinner/Myaddressandoffice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
const Internationalshippingorder = () => {
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
               <th>Back Payment</th>
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
               <td><a className='atwarehouse' href="#"><button style={{backgroundColor: "#FF8024"}}>Order Packed</button></a></td>
               <td><a className='paid' href="#"><button style={{backgroundColor: "#00F444"}}>Paid</button></a></td>
               <td><p style={{color: "#F900A4", padding: "0", margin: "0px "}}>On the way</p>
               <a style={{color: "#1E1E1E"}} className='viewdetails' href="#">View Details <FontAwesomeIcon icon={faChevronDown}/></a></td>
               <td className='verify-order'><a href="#"><button style={{backgroundColor: "#FFC700", color: "#000"}}>Amount pending $ 50.00</button></a></td>
           </tr>
       </table>

       <div className='shipping-details'>
        <div className='row'>
            <div className='col-8'>
                <div className='shipping-parceldetails'>
                    <div className='row'>
                        <div className='col-4'>
                        <h3>Shipping Details</h3>
                        <label>
                        Order Tracking ID
                        <input type="text" placeholder='q5swx15wd'/>
                        </label>
                  
                        <label>
                        Shipping Company
                        <input type="text" placeholder='FEDX International' />
                        </label>

                        <div className='deliverydate'>
                            <label>Delivery Date</label>
                            <h6>29-June-2023 , MON</h6>
                        </div>

                        </div>

                        <div className='col-8'>
                        <h3>Parcel Size</h3>
                        <div className='length-width-height'>
                            <div className='length'>
                                <lable>Length (cm)</lable>
                                <input type="text" />
                            </div>
                            <div className='length'>
                                <lable>Width (cm)</lable>
                                <input type="text" />
                            </div>
                            <div className='length'>
                                <lable>Height (cm)</lable>
                                <input type="text" />
                            </div>
                            
                        </div>
                        <div className='estimate'>
                            <label>Estimated Shipping Cost</label>
                            <h6>US $56.33</h6>
                        </div>
                        </div>
                    </div>
                    
                </div>
                <div className='paynow-button'>
        <a href="#"><button style={{backgroundColor: "#F9B300"}}>Track Order</button></a>
       </div>
            </div>
            <div className='col-4'>
                <div className='deliveryaddress'>
                    <h3>Delivery Address</h3>
                    <table>
                            <tr>
                                <td>Receiver*</td>
                                <td className='last-col'>John Doe</td>
                            </tr>
                            <tr>
                                <td>Regions*</td>
                                <td className='last-col'>USA ,MI</td>
                            </tr>
                            <tr>
                                <td>Address*</td>
                                <td className='last-col'>13101 SOUTHAMPTON ST DETROIT MI 48213-3700 USA</td>
                            </tr>
                            <tr>
                                <td>Mobile*</td>
                                <td className='last-col'>02184548845</td>
                            </tr>
                            <tr>
                                <td>Post/Zip Code*</td>
                                <td className='last-col'>3700</td>
                            </tr>
                    </table>
                </div>
            </div>
        </div>
        
   </div>
       </div>

  </>
  )
}

export default Internationalshippingorder