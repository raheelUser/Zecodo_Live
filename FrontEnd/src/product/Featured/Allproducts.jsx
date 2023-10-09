import React, {
    useEffect,
    useState,
    Routes,
    Route
} from 'react'
import {
    Link
} from 'react-router-dom';
import Productimage1 from '../../Images/Productimages/1.png'
import Productimage2 from '../../Images/Productimages/2.png'
import Productimage3 from '../../Images/Productimages/3.png'
import Productimage4 from '../../Images/Productimages/4.png'
import Productimage5 from '../../Images/Productimages/5.png'
import Star from '../../Images/star.png'
import Heart from '../../Images/userimages/mywishlist/heartfilled.png'
import Downarrow from '../../Images/downarrow.png'
import ProductBackground from '../../Images/bg-row-product.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import heartFill from '../../Images/userimages/mywishlist/heartfilled.png'
import {
  BASE_API
} from '../../services/Constant'
const AllProducts = () => {
  const instance = axios.create();
  const [user, setUser] = useState([]);
  const [featureProducts, setFeaturedProducts] = useState([]);
  const fetchFeaturedProducts = () => {
    axios.get(`${BASE_API}/getFeatured`)
        .then(
            response => {
                console.log('aa')
                setFeaturedProducts(response.data);
            })
        .catch(error => {
            console.log("ERROR:: ", error.response);
        });
};
const getUserData = () =>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const  loggedInUsers = JSON.parse(loggedInUser);
        setUser(loggedInUsers);
    }
}
const _onUserLike = (guid) => {
    let token = localStorage.getItem("token");
    axios.defaults.headers = {
        Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.post(`${BASE_API}/products/saved-users/${guid}`)
        .then(
            response => {
                alert(response.data)
            })
        .catch(error => {
            console.log("ERROR:: ", error.response);
        });
};
useEffect(() => {
    fetchFeaturedProducts();
    getUserData();
}, []);
    return (

        <>
        <section id="productcard">
            <div className="container">
               
                <div className="row related-productsrow row-cols-auto recent">
                {featureProducts?.map((fproduct) => (
                    <div className="col">
               
                  <div className="product">
                    <h6>
                      <a href="#" onClick={(e,i) => (e.preventDefault(),_onUserLike(fproduct.guid))} >
                      {
                        fproduct.saved_users?.filter((like) => like.user_id=== user.id).length > 0
                        ? <img src={heartFill} />
                        : <img src={Heart} />
                    }
                      </a>
                    </h6>
                    <Link
                to={{
                    pathname: `/singleproduct/${fproduct.guid}`
                }}
                >
                    <img className="product-image" src={Productimage1} />
                    <div className="item-details">
                      <h3>{fproduct.name}</h3>
                      <div className="category">
                        <ul>
                          <li>{fproduct.category}</li>
                        </ul>
                      </div>
                      <div className="price">
                        <p>
                          {(() => {
								if (!fproduct.sale_price){
									return (
										<div>$ {fproduct.price}</div>
									)
								}
								if (fproduct.sale_price){
									return(
                                       <afterSales price={fproduct.price} salePrice={fproduct.sale_price} />
									)	
								}
								
								return null;
								})()}
                            
                            
                        </p>
                      </div>
                      <div className="reviews">
                        <span>
                          <span>Best Seller</span> <img src={Star} />
                          {fproduct.ratings_count}
                        </span>
                      </div>
                    </div>
                    </Link>
                  </div>
                
            </div>
            ))}
                    <div className="col">
                        <a href="/singleproduct">
                    <div className="product">
                       
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
                    </div>
                    
                    {/* <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                     
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
                   
                        <img className="product-image" src={Productimage4} />
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
                   
                        <img className="product-image" src={Productimage2} />
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
                   
                        <img className="product-image" src={Productimage3} />
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
                   
                        <img className="product-image" src={Productimage2} />
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
                   
                        <img className="product-image" src={Productimage1} />
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
                   
                        <img className="product-image" src={Productimage1} />
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
                   
                        <img className="product-image" src={Productimage1} />
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
                   
                        <img className="product-image" src={Productimage1} />
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
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
                   
                        <img className="product-image" src={Productimage4} />
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
                        <img className="product-image" src={Productimage1} />
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
                    </div>
                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
                        <img className="product-image" src={Productimage3} />
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
                        <img className="product-image" src={Productimage2} />
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
                   
                        <img className="product-image" src={Productimage1} />
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
                    </div>
                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
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
                    </div>

                    <div className="col">
                    <a href="/singleproduct">
                    <div className="product">
                   
                        <img className="product-image" src={Productimage1} />
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

export default AllProducts;