import React from 'react'
import Productimage from '../../../Images/userimages/Myshopping cart/1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Paywithstripe from '../../InternationalorderPaymentfields.jsx/Paywithstripe'
import Stripe from '../../../Images/userimages/myshoppingorders/internationshipping/stripe.png'
import Paypal from '../../../Images/userimages/myshoppingorders/internationshipping/paypal.png'
import Paywithpaypal from '../../InternationalorderPaymentfields.jsx/Paywithpaypal'


const ConfirmPayment = () => {
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
                   <img src={Productimage}/>
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
               <td><p style={{color: "#D92C2C", padding: "0", margin: "0px "}}>Confirmed</p>
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
                <div className='internationshippingamout'>
                    <div className='row'>
                        <div className='col-6'>
                            <h3>International Shipping Amount Paid</h3>
                            <h2> US $56.33</h2>
                            <div className='actual-amount'>
                                <h3>Actual to be Amount Paid</h3>
                                <h2>US $52.33</h2>
                            </div>
                        </div>
                        <div className='col-6'>
                        <h3>Amount Difference</h3>
                            <h2>-US $ 2.00</h2>
                            <div className='actual-amount'>
                                <h3>Amount Difference Paid By</h3>
                                <h2>US $52.33</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='paynow-button'>
        <a href="#" className='modal-linkss'><button style={{backgroundColor: "#F9D100"}}>Pay Difference</button></a>
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

{/* EDIT IT  */}
<div id="confirmmodals" class="custom-modal">
        <div class="custom-modal-dialog">
            <div class="custom-modal-content">
               <span class="close-modal">X</span>
                <div class="custom-modal-body">
                    <div class="custom-modal-inner">
                        <div className='confirm-modal-check'>
                        <div className='row'>
            <div className='col-8'>
            <div class="accordion" id="accordionExamplee">
  <div class="accordion-item">
    <h2 class="accordion-header" id="new">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseOne">
      Pay with Stripe <img src={Stripe} />
      </button>
    </h2>
    <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="new" data-bs-parent="#accordionExamplee">
      <div class="accordion-body">
      <Paywithstripe /> 
    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="new1">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseTwo">
      Pay With Paypal <img src={Paypal} />
      </button>
    </h2>
    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="new1" data-bs-parent="#accordionExamplee">
      <div class="accordion-body">
      <Paywithpaypal />
       </div>
    </div>
  </div>

</div>
            </div>
            <div className='col-4'>
                <div className='estimated-detials'>
                    <div className='shipngcompany'>
                        <h2>Shipping Company</h2>
                        <h3>FEDX International</h3>
                    </div>
                    <div className='shipngcompany'>
                        <h2>Delivery Date</h2>
                        <h3>29-June-2023 , MON</h3>
                    </div>
                    <div className='shipngcompany last'>
                        <h2>Delivery Address</h2>
                        <h3>13101 SOUTHAMPTON ST DETROIT MI 48213-3700 USA</h3>
                    </div>
                    <div className='total-estimated'>
                        <h3>Estimated <br />International Shipping Cost</h3>
                        <h6>US $56.33</h6>
                    </div>
                </div>
                <div className='confirm-pay'>
                    <a href="#"><button style={{backgroundColor: "#F9D100"}}>Confirm & Pay</button></a>
                </div>
            </div>
        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

{/* CONFIRM PAYMENT POPUP */}

  </>
  )
}

export default ConfirmPayment