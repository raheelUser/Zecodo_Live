import React from 'react'
import Productimage from '../../Images/userimages/myshoppingorders/paymentpending/product.png'
import Productimage1 from '../../Images/userimages/myshoppingorders/paymentpending/product1.png'
import Refund from './Refund'
import '../../assets/js/main'
const Returnorders = () => {
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
                <th>Actions Available</th>
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
                <td><a className='atwarehouse' href="#"><button style={{backgroundColor: "#F9B300"}}>Refund Requested</button></a></td>
                <td><a className='pending' href="#"><button style={{backgroundColor: "#2898FF"}}>Pending</button></a></td>
                <td><a className='pending' href="#"><button style={{backgroundColor: "#2898FF"}}>Pending</button></a></td>
                <td className='verify-order'>
                    <a href="#"><button style={{backgroundColor: "#F9B300", color: "#373737"}}>View Details</button></a>
                    <a href="#"><button style={{backgroundColor: "#fff", color: "#D92C2C", borderColor: "#D92C2C"
                ,border:"1px solid", marginTop: "10px"}}>Cancel Request</button></a>
                </td>
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
                <td><a className='atwarehouse' href="#"><button style={{backgroundColor: "#F9B300"}}>Refund Requested</button></a></td>
                <td><a className='pending' href="#"><button style={{backgroundColor: "#2898FF"}}>Pending</button></a></td>
                <td><a className='pending' href="#"><button style={{backgroundColor: "#2898FF"}}>Pending</button></a></td>
                <td className='verify-order'>
                    <a href="#"><button style={{backgroundColor: "#F9B300", color: "#373737"}}>View Details</button></a>
                    <a href="#"><button style={{backgroundColor: "#fff", color: "#D92C2C", borderColor: "#D92C2C"
                ,border:"1px solid", marginTop: "10px"}}>Cancel Request</button></a>
                </td>
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
                <td><a className='atwarehouse' href="#"><button style={{backgroundColor: "#F9B300"}}>Refund Requested</button></a></td>
                <td><a className='pending' href="#"><button style={{backgroundColor: "#2898FF"}}>Pending</button></a></td>
                <td><a className='pending' href="#"><button style={{backgroundColor: "#2898FF"}}>Pending</button></a></td>
                <td className='verify-order'>
                    <a href="#"><button style={{backgroundColor: "#F9B300", color: "#373737"}}>View Details</button></a>
                    <a href="#"><button style={{backgroundColor: "#fff", color: "#D92C2C", borderColor: "#D92C2C"
                ,border:"1px solid", marginTop: "10px"}}>Cancel Request</button></a>
                </td>
            </tr>

        </table>
    </div>
    </>

     
  )
}

export default Returnorders