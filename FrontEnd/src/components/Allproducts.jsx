import React, {
    useEffect,
    useState,
    Routes,
    Route
} from 'react'
import {
    Link
} from 'react-router-dom';
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
import axios from "axios";
import ReactPaginate from "react-paginate";
import heartFill from '../Images/userimages/mywishlist/heartfilled.png'
import {
  BASE_API
} from '../services/Constant'

const AllProducts = () => {

    const instance = axios.create();
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const fetchProducts = () => {
      axios.get(`${BASE_API}/products`)
          .then(
              response => {
                console.log(response)
                setProducts(response.data.data);
              })
          .catch(error => {
              console.log("ERROR:: ", error.response);
          });
    };
    const onPageChange = (currentPage, totalPages) => {
        this.setState({
          currentPage,
          totalPages
        });
      };
useEffect(() => {
    fetchProducts();
}, []);
    return (

        <>
        <section id="productcard">
            <div className="container">
            {/* <ReactPaginate
                        totalItems={products.length}
                        itemsPerPage={2}
                        pageRangeDisplayed={2}
                        onPageChange={onPageChange}
                        previousLabel="Previous"
                        nextLabel="Next"
                    />
                    <ul>
                        {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                        ))}
                    </ul> */}
                <div className="row related-productsrow row-cols-auto recent">
                {products.map(product => (
                    <div className="col">
                          <Link
                to={{
                    pathname: `/singleproduct/${product.guid}`
                }}
                >
                    <div className="product">
                        <img className="product-image" src={product.media[0]?.url  ? product.media[0]?.url  :Productimage1} />
                        <div className="item-details">
                        <h3>{product.name}</h3>
                        <div className="category">
                            {product.category}
                            {/* <ul>
                                <li>Watches</li>
                                <li>Accessories</li>
                            </ul> */}
                        </div>
                        <div className="price">
                            <p>$ {product.price}</p>
                        </div>
                        <div className="reviews">
                        <span><img src={Star}/>{product.ratings_count ? product.ratings_count : 0}</span>
                        </div>
                        </div>
                    </div>
                    </Link>
                    </div>
                    ))}
                     {/*
                    <div className="col">
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
                    </div>*/}

                </div> 
            </div>
        </section>

        
        </>
    );
};

export default AllProducts;