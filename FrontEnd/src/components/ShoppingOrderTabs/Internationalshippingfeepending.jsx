import React from 'react'
import Productimage from '../../Images/userimages/myshoppingorders/paymentpending/product.png'
import Myaddressandoffice from '../Myaddressinner/Myaddressandoffice'
import Paywithstripe from '../InternationalorderPaymentfields.jsx/Paywithstripe'
import Stripe from '../../Images/userimages/myshoppingorders/internationshipping/stripe.png'
import Paypal from '../../Images/userimages/myshoppingorders/internationshipping/paypal.png'
import Paywithpaypal from '../InternationalorderPaymentfields.jsx/Paywithpaypal'
const Internationalshippingfeeorder = () => {
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
               <td><a className='atwarehouse' href="#"><button style={{backgroundColor: "#FF8024"}}>Order Packed</button></a></td>
               <td><a className='paid' href="#"><button style={{backgroundColor: "#00F444"}}>Paid</button></a></td>
               <td><p>estimated International Shipping  Cost : $ 56.63</p><a className='viewdetails' href="#">View Details</a></td>
               <td className='verify-order'><a href="#"><button style={{backgroundColor: "#F9B300", color: "#373737"}}>Product Verified</button></a></td>
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
                        <input type="text" />
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
        <a href="#"><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundColor: "#F9D100"}}>Pay Now</button></a>
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

       <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div className='row'>
            <div className='col-8'>
            <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Pay with Stripe <img src={Stripe} />
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <Paywithstripe /> 
    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Pay With Paypal <img src={Paypal} />
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
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
  </>
  )
}

export default Internationalshippingfeeorder