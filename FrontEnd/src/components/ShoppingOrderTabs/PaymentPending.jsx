import React from 'react'
import Productimage from '../../Images/userimages/myshoppingorders/paymentpending/product.png'
import Productimage1 from '../../Images/userimages/myshoppingorders/paymentpending/product1.png'
const PaymentPending = () => {
  return (
    <>
    <div className='paymentpending'>
        <div className='row' style={{padding: "20px 0px"}}>
            <div className='col-9'>
            <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label class="form-check-label" for="flexRadioDefault2">
  Consolidated Payments
  </label>
</div>
            </div>
            <div className='col-3'>
                <p><span> 0 </span>Selected</p>
            </div>
        </div>
        <table id='paymentpending-table'>
            <tr className='firstrow'>
                <th>Item Details</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Logistics Status</th>
                <th>Total Amount</th>
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
                <td><a className='payment' href="#"><button style={{backgroundColor: "#9099FF"}}>Payment Pending</button></a></td>
                <td><a className='paynow' href="#"><button>Pay Now</button></a><br/><a className='cancel' href="#">Cancel order</a></td>
                <td><a className='viewdetails' href="#">View Details</a></td>
                <td className='total-amount'>Total Amount:  US $ 59.56</td>
            </tr>

            <tr>
                <td><div className='product-listing'>
                    <img src={Productimage1} />
                    <div className='product-info'>
                        <h2>
                        Order #ID: 15s5d8e1
                        </h2>
                        <h3>High Heels Women Fashion Bow<br /> Set Foot Temperament Wedding Shoes</h3>
                        <p>Product ID#GX6394</p>
                    </div>
                </div></td>
                <td width= "8%">$ 54.63</td>
                <td>1</td>
                <td><a className='payment' href="#"><button style={{backgroundColor: "#9099FF"}}>Payment Pending</button></a></td>
                <td><a className='paynow' href="#"><button>Pay Now</button></a><br/><a className='cancel' href="#">Cancel order</a></td>
                <td><a className='viewdetails' href="#">View Details</a></td>
                <td className='total-amount'>Total Amount:  US $ 59.56</td>
            </tr>
        </table>
    </div>
    </>
  )
}

export default PaymentPending