import React, {
    useEffect,
    useState,
    Routes,
    Route
  } from 'react'
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
import {
    Link
} from 'react-router-dom';
import axios from "axios";
import {
  BASE_API
} from '../services/Constant'
const RelatedProducts = (guid) => {
    const instance = axios.create();
    const [related, setRelated] = useState([]);
    const fetchProduct = () => {
       
        axios.get(`${BASE_API}/products/related/${guid?.guid}`)
            .then(
                response => {
                //   console.log('setRelated',response.data)
                  setRelated(response.data);
                })
            .catch(error => {
                console.log("ERROR:: ", error);
            });
      };
      useEffect(() => {
        window.setTimeout(()=>{
            fetchProduct();
          }, 3000);
      }, []);
    return (

        <>

        <section id="productcard"
        style={{padding: "50px 0px 30px 0px"}}
        >
            <div className="container">
                <div className="row"
                style={{padding:"40px 0px"}}
                >
                    <div className="col-7">
                    <div className="headingw-wishlist">
                    <h2><strong>Related</strong> Products</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh 
                        euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad 
                        minim veniam, quis nostrud exerci</p>
                    </div>
                    </div>
                    <div className="col-5 align-self-top">
                    <a className="see-all-button" href="/productpage">See All Products</a>
                    </div>
                </div>
                <div className="row related-productsrow row-cols-auto recent">
                {related.map(product => (
                     <div className="col" key={product?.id}>
                     {/* <Link
                to={{
                    pathname: `/singleproduct/${guid}`
                }}
                > */}
                <a href={`/singleproduct/${guid.guid}`}>
                 <div className="product">
                    
                     <img className="product-image" src={Productimage1} />
                     <div className="item-details">
                     <h3>{product?.name}</h3>
                     <div className="category">
                        {product.category?.name}
                         {/* <ul>
                             <li>Watches</li>
                             <li>Accessories</li>
                         </ul> */}
                     </div>
                     <div className="price">
                         <p>$ {product.price}</p>
                     </div>
                     <div className="reviews">
                     <span><img src={Star}/>{product.ratings_count}</span>
                     </div>
                     </div>
                 </div>
                 </a>
                 {/* </Link> */}
                 </div>
                ))}
                   
                   
                    
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
                    </div>
                    <div className="col">
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

export default RelatedProducts;