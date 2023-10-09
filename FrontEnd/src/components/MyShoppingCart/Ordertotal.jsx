import React, {
    useEffect,
    useState,
  } from 'react'
  import axios from "axios";
import {
  BASE_API
} from '../../services/Constant'
const Ordertotal = () => {
    const instance = axios.create();
    const initialValue = 0;
    let total = 0;
    const US = "$"
    const [carts, setCart] = useState([]);
    const [user, setUser] = useState([]);
    const [prices, setPrices] = useState([]);
    const [order,setOrder] = useState([])
    const [customer, setCustomer] = useState([]);

    let currency = localStorage.getItem("currency");
    let token = localStorage.getItem("token");
    let coupon = localStorage.getItem("user_coupon");
    const fetchCart = () => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const loggedInUsers = JSON.parse(loggedInUser);
            setUser(loggedInUsers);
            axios.defaults.headers = {
                Authorization: 'Bearer ' + JSON.parse(token)
            }
            axios.get(`${BASE_API}/cart/self`)
                .then(
                    response => {
                    console.log('Cart Data',response.data)
                    setCart(response.data);
                    
                    })
                .catch(error => {
                    console.log("ERROR:: ", error);
                });
        }else{
           window.location.replace('/signin');
        }
      };
      const getPrices = () => {
        axios.get(`${BASE_API}/prices/`)
        .then(
            response => {
            console.log('prices',response.data)
            setCart(response.data);
            
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
      }
      const fetchCustomer = () => {
        axios.defaults.headers = {
            Authorization: 'Bearer ' + JSON.parse(token)
        }
        axios.get(`${BASE_API}/user/address/getdefault`)
        .then(
            response => {
            console.log('customer',response.data)
            setCustomer(response.data);
            
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
      }
      const handleOrder =(e) =>{
        e.preventDefault();
        console.log('order capture...')
        let order= {
            'fname' : customer.fname,
            'lname' : customer.lname,
            'company': customer.company,
            'region': customer.country,
            'address': customer.address,
            'city': customer.city,
            'state': customer.state,
            'zip': customer.zip,
            'phone': customer.mobile,
            'email': customer.email,
            'payment_status': 'pending',
            'Amount': total,
            'Curency': currency? currency: US,
            'Customer': customer,
            'buyer_id': 1,
            'cartItems': carts,
            'usr_cupons': coupon
        }
        console.log('orders',order)
        axios.defaults.headers = {
            Authorization: 'Bearer ' + JSON.parse(token)
        }
        axios.post(`${BASE_API}/userorder/add`, order)
        .then(
            response => {
            console.log('userOrder',response.data)
            setOrder(response.data);
            
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
      }
      useEffect(() => {
        fetchCart();
        getPrices();
        fetchCustomer();
      }, []);
  return (
    <>
    <div className='order-total'>
        <h3>Order Total</h3>
        <div className='product-name'>
            <table>
            {
            carts.length > 1
            ?(
                <>
                {carts.map(cart =>{
                    total = carts.reduce((accumulator,current) => accumulator + current.price * current.quantity, initialValue)
                    return (
                        <tr>
                            <td>{cart.name}</td>
                            <td className='price-order-total'>{US} {cart.price}</td>
                        </tr>
                    )
                })}
               </>
            )
               :('No Cart Items')
            }
            </table>
            {/* <tr>
                        <td>Global Daddy Sho.....( 1 )</td>
                        <td className='price-order-total'>$58.88</td>
                    </tr>
                    <tr>
                        <td>Global Daddy Sho.....( 1 )</td>
                        <td className='price-order-total'>$58.88</td>
                </tr> */}

        </div>
        <div className='shipping-fee'>
            <table>
                {/* <tr>
                    <td>Platform Fee </td>
                    <td>7%</td>
                </tr> */}
                {
                    prices.length >0 && carts.length >0
                    ?(
                        <>
                        {prices.map(price =>{
                            return (
                                <tr key={price.id}>
                                <td>{price.name}xz</td>
                                <td className='price-order-total'>{US} {price.value}</td>
                            </tr>
                            )
                        })}
                    </>
                    )
                    :('')
                    }
                {/* <tr>
                    <td>Shipping charges</td>
                    <td>$56.00</td>
                </tr> */}
            </table>
        </div>
        <div className='order-total-price'>
            <table>
                <tr>
                    <td>Order Total</td>
                    <td>{US} {total.toFixed(2)? total.toFixed(2): 0}</td>
                </tr>
            </table>
        </div>
        <div className='confirm-paybutton'>
            <a href="#"><button onClick={handleOrder} >Confirm & Pay</button></a>
        </div>
    </div>
    </>
  )
}

export default Ordertotal