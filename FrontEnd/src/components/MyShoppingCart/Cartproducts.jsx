import React, {
    useEffect,
    useState,
    Routes,
    Route
  } from 'react'
import Productimage from '../../Images/userimages/Myshopping cart/1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  BASE_API
} from '../../services/Constant'
const Cartproducts = () => {
    const instance = axios.create();
    const US = "US"
    const [carts, setCart] = useState([]);
    const [user, setUser] = useState([]);
    let currency = localStorage.getItem("currency");
    let token = localStorage.getItem("token");

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
      const deleteItem = (e,id) =>{
        e.preventDefault();
        axios.defaults.headers = {
            Authorization: 'Bearer ' + JSON.parse(token)
        }
        axios.delete(`${BASE_API}/cart/destroy/${id}`)
        .then(
            response => {
            console.log('delete',response)
            fetchCart();
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
      }
      useEffect(() => {
        fetchCart();
      }, []);
  return (
    <>
    <div className='cart-products'>
        <h3>
        Products
        </h3>
        {
            carts.length >0
            ?(

                <>
                {carts.map((cart) => {
								// console.log(cart);
                                // const check = JSON.parse(cart.attributes);
                                // console.log('check', check)
                                // const billyEntries = Object.entries(check);
								return (
									<>
                                    <div className='product-list'>
                    <table>
                        <tr key={cart?.id}>
                            <td><img src={Productimage}/></td>
                            <td><h4>{cart?.name} </h4>
                                {/* {
                                    Object.keys(check).length >0
                                    ? (<>
                                        {check.map((a)=>{
                                            console.log('a', a);
                                            {Object.entries(a).map(([key, value]) => {
                                                const theValue = a[value];
                                                console.log(`${key}:${value}`);
                                                return (<div className='size'>ss{theValue}</div>);
                                          }) }
                                         })} 
                                        <div className='size'>
                                            <p>Size : </p>
                                            <p>34</p>
                                        </div>
                                        <div className='color'>
                                            <p>Color: </p>
                                            <p>Red</p>
                                        </div>
                                        <div className='quantity'>
                                            <p>Quantity :  </p>
                                            <p>01</p>
                                        </div>
                                    </>)
                                :('')} */}
                                <div className='size'>
                                            <p>Size : </p>
                                            <p>34</p>
                                        </div>
                                        <div className='color'>
                                            <p>Color: </p>
                                            <p>Red</p>
                                        </div>
                                        <div className='quantity'>
                                            <p>Quantity :  </p>
                                            <p>01</p>
                                        </div>
                            </td>
            
                            <td className='last-td'>
                                <a className='trash
                                ' href="#"><FontAwesomeIcon icon={faTrash} onClick={(e) => deleteItem(e,cart?.id)} /></a>
                                <div className='totalprice'>
                                    <p>{currency?currency:US} $ {cart?.price}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>        
                                    </>
								);
							})}
                            </>
            )
            
            :(
                <p>NO Item in Cart</p>
            )
        }
        
        {/* PRODUCT LIST 1 */}
        {/* <div className='product-list'>
            <table>
          
                <tr>
                    <td><img src={Productimage}/></td>
                    <td><h4>Global Daddy Shoes Female Summer <br />Explosion Thick Soled Black Shoes </h4>
                    <div className='size'>
                            <p>Size : </p>
                            <p>34</p>
                        </div>
                        <div className='color'>
                            <p>Color: </p>
                            <p>Red</p>
                        </div>
                        <div className='quantity'>
                            <p>Quantity :  </p>
                            <p>01</p>
                        </div>
                    </td>

                    <td className='last-td'>
                        <a className='trash
                        ' href="#"><FontAwesomeIcon icon={faTrash} /></a>
                        <div className='totalprice'>
                            <p>US $ 38.99</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div> */}

        {/* PRODUCT LIST 2 */}
        {/* <div className='product-list'>
            <table>
                <tr>
                    <td><img src={Productimage}/></td>
                    <td><h4>Global Daddy Shoes Female Summer <br />Explosion Thick Soled Black Shoes </h4>
                    <div className='size'>
                            <p>Size : </p>
                            <p>34</p>
                        </div>
                        <div className='color'>
                            <p>Color: </p>
                            <p>Red</p>
                        </div>
                        <div className='quantity'>
                            <p>Quantity :  </p>
                            <p>01</p>
                        </div>
                    </td>

                    <td className='last-td'>
                        <a className='trash
                        ' href="#"><FontAwesomeIcon icon={faTrash} /></a>
                        <div className='totalprice'>
                            <p>US $ 38.99</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div> */}
    </div>
    </>
  )
}

export default Cartproducts