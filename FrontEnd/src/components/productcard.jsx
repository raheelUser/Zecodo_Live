import React, {
    useEffect,
    useState,
    Routes,
    Route
} from 'react'
import {
    Link
} from 'react-router-dom';
import Productimage1 from "../Images/Productimages/1.png";
import Productimage2 from "../Images/Productimages/2.png";
import Productimage3 from "../Images/Productimages/3.png";
import Productimage4 from "../Images/Productimages/4.png";
import Productimage5 from "../Images/Productimages/5.png";
import Star from "../Images/star.png";
import axios from "axios";
import Heart from '../Images/heart.png'
import Downarrow from '../Images/downarrow.png'
import ProductBackground from '../Images/bg-row-product.jpg'
import heartFill from '../Images/userimages/mywishlist/heartfilled.png'
import {
    BASE_API
} from '../services/Constant'
var Productcardcss = {
    padding: "40px 40px",
    backgroundImage: `url(${ProductBackground})`
};
const ProductCard = () => {
    const instance = axios.create();
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const [featureProducts, setFeaturedProducts] = useState([]);
    const fetchFourProducts = () => {
        axios.get(`${BASE_API}/getFourproducts`)
            .then(
                response => {
                    setProducts(response.data);
                })
            .catch(error => {
                console.log("ERROR:: ", error.response);
            });
    };
    const fetchFeaturedProducts = () => {
        axios.get(`${BASE_API}/getFeatured`)
            .then(
                response => {
                    setFeaturedProducts(response.data);
                })
            .catch(error => {
                console.log("ERROR:: ", error.response);
            });
    };
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
    const getUserData = () =>{
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const  loggedInUsers = JSON.parse(loggedInUser);
			setUser(loggedInUsers);
		}
    }
        // Function to clear complete cache data
        const clearCacheData = () => {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
            alert('Complete Cache Cleared')
        };
    useEffect(() => {
        fetchFourProducts();
        fetchFeaturedProducts();
        getUserData();
    }, []);
return (
<>
<section id="productcard"
style={{padding: "50px 0px 0px 0px"}}
>
<div className="containerrr">
   <div className="row"
   style={{padding: "0px 40px"}}>
   <div className="col-9">
      <h1>Recent Viewed <strong>Products</strong></h1>
      {/* <div style={{ height: 500, width: '80%' }}>
            <h4>How to clear complete cache data in ReactJS?</h4>
            <button onClick={() => clearCacheData()} >
                Clear Cache Data</button>
        </div> */}
      <p>Price and other details may vary based on product size and color.</p>
   </div>
   <div className="col-3 align-self-center">
      <a href="/productpage">See All </a>
   </div>
</div>
<div className="row row-cols-auto recent"
   style={Productcardcss}
   >
   {products?.map((product) => (
   <div className="col-2">
      <div className="product">
         <h6>
            <a href="#"  key={product.id} onClick={(e,i) => (e.preventDefault(),_onUserLike(product.guid))} >
            {
                product.saved_users?.filter((like) => like.user_id=== user.id).length > 0
                  ? <img src={heartFill} />
                  : <img src={Heart} />
              }
            </a>
         </h6>
         <Link
         to={{
         pathname: `/singleproduct/${product.guid}`
         }}
         >
         {/* <img className="product-image" src={product.media[0]?.url ? product.media[0]?.url : Productimage1} /> */}
         <img className="product-image" src={Productimage1} />
         <div className="item-details">
            <h3>{product.name}</h3>
            <div className="category">
               <ul>
                  <li>{product.category}</li>
               </ul>
            </div>
            <div className="price">
               <p>$ {product.price}</p>
            </div>
            <div className="reviews">
               <span>
               <img src={Star} />
               {product.ratings_count}
               </span>
            </div>
         </div>
         </Link>
      </div>
   </div>
   ))}
  
   <div className="view-more">
      <a href="/productpage">
         <img src={Downarrow}/>
         <p>View more</p>
      </a>
   </div>
</div>
</div>
</section>
{/* BEST SELLING PRODUCTS START */}
<section id="productcard"
style={{padding: "50px 0px 0px 0px", margin: "30px 0px 0px 0px"}}
>
<div className="containerrr">
   <div className="row"
   style={{padding: "0px 40px"}}>
   <div className="col-9">
      <h1><strong>Best</strong> Selling Products</h1>
      <p>Price and other details may vary based on product size and color.</p>
   </div>
   <div className="col-3 align-self-center">
      <a href="/productpage">See All </a>
   </div>
</div>
<div className="row row-cols-auto best-selling
   "
   style={Productcardcss}
   >
    
   {featureProducts?.map((fproduct) => (
              <div className="col-2">
               
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
   
   <div className="view-more">
      <a href="/feturedproducts">
         <img src={Downarrow}/>
         <p>View more</p>
      </a>
   </div>
</div>
</div>
</section>
{/* BEST SELLING PRODUCTS END */}
</>
);
};
export default ProductCard;