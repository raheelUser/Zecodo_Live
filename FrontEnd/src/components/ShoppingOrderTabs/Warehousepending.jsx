import React from 'react'
import Productimage from '../../Images/userimages/myshoppingorders/paymentpending/product.png'
import Productimage1 from '../../Images/userimages/myshoppingorders/paymentpending/product1.png'
const Warehousepending = () => {
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
                <td><a className='arriving' href="#"><button style={{backgroundColor: "#81C2FF"}}>Arriving At Warehouse</button></a></td>
                <td><a className='paid' href="#"><button style={{backgroundColor: "#00F444"}}>Paid</button></a></td>
                <td><a className='viewdetails' href="#">View Details</a></td>
                <td className='total-amount'>Total Amount:  US $ 59.56</td>
            </tr>
        </table>
    </div>
    </>
  )
}

export default Warehousepending