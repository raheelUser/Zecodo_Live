import React, { useEffect, useState } from "react"
import Productimage1 from '../Images/Productimages/1.png'
import Productimage2 from '../Images/Productimages/2.png'
import Productimage3 from '../Images/Productimages/3.png'
import Productimage4 from '../Images/Productimages/4.png'
import Productimage5 from '../Images/Productimages/5.png'
import Star from '../Images/star.png'
import Heart from '../Images/userimages/mywishlist/heartfilled.png'
import Downarrow from '../Images/downarrow.png'
import ProductBackground from '../Images/bg-row-product.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from './Helpers/Autocomplete'
import axios from 'axios'
import { BASE_API } from '../services/Constant';

const WishlistCard = () => {
    const instance = axios.create();
    const [wishList, setWishList] = useState([])
    const [self, setSelf] = useState([])
    const fetchwishList = () => {
      var localUser = localStorage.getItem('user'); 
      var loggedInUser = JSON.parse(localUser); 
      var token =localStorage.getItem('token');
    //   console.log('Bearer ' + JSON.parse(token))
// console.log('token', JSON.parse(token))      
      axios.get(`${BASE_API}/products/saved`, {
        headers: {
            // 'Content-Type': 'application/json;charset=utf-8',
            // 'Authorization': 'Bearer ' + token ,
            // 'method': 'GET'
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ JSON.parse(token),
            'method': 'GET'
        }
    },)
      .then(data => {
        setWishList(data.data)
        })
    }
    const searchProducts = (e) =>{
        let value = e.target.value;
        console.log(e.target.value)
        var localUser = localStorage.getItem('user'); 
        var loggedInUser = JSON.parse(localUser); 
         var token =localStorage.getItem('token');
         axios.defaults.headers = {
            Authorization: 'Bearer ' + JSON.parse(token)
          }
          axios.get(`${BASE_API}/products/like/${value}`)
          .then(
              response => {
                // console.log('products like',response.data)
                setWishList(response)
              })
          .catch(error => {
              console.log("ERROR:: ", error);
          });
    };
    
    useEffect(() => {
        fetchwishList()
    }, [])

    return (

        <>

        <section id="productcard"
        style={{padding: "50px 0px 0px 0px"}}
        >
            <div className="containerrr">
                <div className="row"
                style={{padding:"40px 0px"}}
                >
                    <div className="col-6">
                    <div className="headingw-wishlist">
                    <h2>My Wish List<span>{wishList.length} items</span></h2>
                    </div>
                    </div>
                    <div className="col-6">
                    <div className="search-bar">
                    
					<input onBlur={searchProducts} placeholder="Search by product name/image/image URL"/> 
					<button className="search"><FontAwesomeIcon icon={faSearch} /></button>
					
					</div>
                    </div>
                </div>
                <div className="row row-cols-auto recent">
                {
                wishList.length >0
            ?(
                <>{wishList?.map(wishlist => (
                    <div className="col">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage1} />
                        <div className="item-details">
                        <h3>{wishlist.name}</h3>
                        <div className="category">
                            <ul>
                                <li>{wishlist.category.name}</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ {wishlist.price}</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>{wishlist.ratings_count}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}</>
            ):('No Items in WishList')}
                    {/* <div className="col">
                        <a href="/singleproduct">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage1} />
                        <div className="item-details">
                        <h3>Michael kors</h3>
                        <div className="category">
                            <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ 255.90</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>4.8</span>
                        </div>
                        </div>
                    </div>
                    </a>
                    </div> */}
                    
                    {/* <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage3} />
                        <div className="item-details">
                        <h3>Nail Polish Premium Set</h3>
                        <div className="category">
                            <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ 255.90</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>4.8</span>
                        </div>
                        </div>
                    </div>
                    </a>
                    </div> */}
                    {/* <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage4} />
                        <div className="item-details">
                        <h3>Nike Sneakers</h3>
                        <div className="category">
                            <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ 255.90</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>4.8</span>
                        </div>
                        </div>
                    </div>
                    </a>
                    </div> */}
                    {/* <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage5} />
                        <div className="item-details">
                        <h3>Dell Inspiron</h3>
                        <div className="category">
                            <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ 255.90</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>4.8</span>
                        </div>
                        </div>
                    </div>
                    </a>
                    </div> */}

                    {/* <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage5} />
                        <div className="item-details">
                        <h3>Dell Inspiron</h3>
                        <div className="category">
                            <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ 255.90</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>4.8</span>
                        </div>
                        </div>
                    </div>
                    </a>
                    </div> */}

                    {/* <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                        <h6><a href="#"><img src={Heart}/> </a></h6>
                        <img className="product-image" src={Productimage5} />
                        <div className="item-details">
                        <h3>Dell Inspiron</h3>
                        <div className="category">
                            <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className="price">
                            <p>$ 255.90</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>4.8</span>
                        </div>
                        </div>
                    </div>
                    </a>
                    </div> */}

                </div>
            </div>
        </section>

        
        </>
    );
};

export default WishlistCard;