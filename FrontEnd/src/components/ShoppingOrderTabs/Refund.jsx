import React from 'react'
import Productimage from '../../Images/userimages/Myshopping cart/1.png'
import Uploadimage from '../../Images/userimages/upload.png'
import Checkimage from '../../Images/userimages/backpaymentimages/check.png'

var sectionStyle = {
    backgroundImage: `url(${Uploadimage})`
};
const Refund = () => {
  return (
    <>
    <div className='refund-complaint'>
        <h2>
        Refund Complaint
        </h2>
        <div className='row'>
            <div className='col-7'>
                <div className='product-info'>
                    <div className='image'>
                        <img src={Productimage} />
                    </div>
                    <div className='text-product'>
                        <h3>Addidas Adizero SL Running Shoes Men's</h3>
                        <p>Size : 9.5 , Color: Red</p>
                        <h5>QTY: 01</h5>
                    </div>
                </div>
            </div>
            <div className='col-5'>
                <div className='order-amout-col'>
                <table id='order-amount-paid'>
                    <tr>
                        <td><strong>Order Amount Paid</strong></td>
                        <td className='last-col'>$103.00</td>
                    </tr>
                    <tr>
                        <td className='shipping'>Shipping</td>
                        <td className='shipping last-col'>-$56.00</td>
                    </tr>
                    <tr>
                        <td>Import Tax</td>
                        <td className='last-col'>-$5.00</td>
                    </tr>
                    <tr>
                        <td className='refundtext'>Refund amount</td>
                        <td className='refundprice last-col'>$ 103.00</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
        <div className='row'>
        <h2>Product Damage Images</h2>
        <div
        style={sectionStyle}
        className='fileuploadrefund'>
        <input  id='upload-feature-refund' type='file' />
        </div>
        <p
        style={{color: "#8F8F8F"}}
        ><em>Minimum 5 images of an item and give Closeup image of a damage product</em></p>
        </div>
        <div className='row'>
            <div className='reason-textarea'>
                <h2>Tell Reason</h2>
                <textarea placeholder='This book is a treatise on the theory of ethics, very popular during the Renaissance. 
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'>
                </textarea>
                <p
        style={{color: "#8F8F8F"}}
        ><em>Make sure the reason you give should be genuine otherwise your refund will be rejected </em></p>
            </div>
        </div>
        <div className='row'>
            <div className='send'>
                <a href="#"><button style={{backgroundColor:"#F9B300"}}>Send</button></a>
            </div>
        </div>
    </div>

    </>
  )
}

export default Refund