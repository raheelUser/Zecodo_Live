import React, {
  useEffect,
  useState,
  Routes,
  Route
} from 'react'
import Productimage from '../Images/Productimages/1.png'
import Productinnerimage from '../Images/Productimages/singleproduct/product.png' 
import Gallery1 from '../Images/Productimages/singleproduct/gallerimages/1.png'
import Gallery2 from '../Images/Productimages/singleproduct/gallerimages/2.png'
import Gallery3 from '../Images/Productimages/singleproduct/gallerimages/3.png'
import Gallery4 from '../Images/Productimages/singleproduct/gallerimages/4.png'
import Gallery5 from '../Images/Productimages/singleproduct/gallerimages/5.png'
import Gallery6 from '../Images/Productimages/singleproduct/gallerimages/6.png'
import Gallery7 from '../Images/Productimages/singleproduct/gallerimages/7.png'
import Aboutproducttab from '../components/Aboutproducttab'
import Productinfoseller from '../components/Productinfoseller'
import RelatedProducts from '../components/Relatedproducts'
import Reviews from '../components/Reviews'
import afterSales from './salePrice/afterSalesSingleProduct'
import axios from "axios";
import {
  BASE_API
} from '../services/Constant'

const Singleproductinner = () => {
    const instance = axios.create();
    const [product, setProduct] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [user, setUser] = useState([]);
    const { pathname } = window.location;
    const lastSegment = pathname.split("/").pop();
    const attribute = { };
    const arr = [];
    const curentAttribute = {}
    const fetchProduct = () => {
      axios.get(`${BASE_API}/products/show/${lastSegment}`)
          .then(
              response => {
                console.log('single product Data',response.data)
                setProduct(response.data);
              })
          .catch(error => {
              console.log("ERROR:: ", error);
          });
    };
    const fetchAttributes = () => {
      axios.get(`${BASE_API}/productAttributes/self/${lastSegment}`)
          .then(
              response => {
                console.log('attributes',response.data)
                // setAttributes(response.data.attribute.options);
                setAttributes(response.data);
              })
          .catch(error => {
              console.log("ERROR:: ", error.response);
          });
    };
   
    const addCart = (e) =>{
      e.preventDefault();
      let token = localStorage.getItem("token");
      let parsedToken = JSON.parse(token);
      let loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
          const loggedInUsers = JSON.parse(loggedInUser);
          setUser(loggedInUsers);
          console.log('parsedToken', parsedToken)
          let uid = loggedInUsers.id;
          axios.defaults.headers = {
            Authorization: 'Bearer ' + parsedToken
          }
          // let curentAttributes = localStorage.getItem('curentAttribute')
          // console.log('curentAttributes', Object.values(JSON.parse(curentAttributes)))
          let cartData ={
            "name": product?.name,
            "price" : product?.price,
            "quantity": "1",
            "user_id": uid,
            "product_id": product?.id,
            "attributes" : JSON.stringify(arr)
          }
          // console.log('cartData', cartData.message)
       
          axios.post(`${BASE_API}/cart/add`, cartData)
            .then(
                response => {
                    alert(response.data.message)
                })
            .catch(error => {
                console.log("ERROR:: ", error.response);
            });
      }else{
        window.location.replace('/signin');
      }

    }
    const addWishList = (e) =>{
      e.preventDefault();
      let token = localStorage.getItem("token");
      let loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
          const loggedInUsers = JSON.parse(loggedInUser);
          setUser(loggedInUsers);
          axios.defaults.headers = {
            Authorization: 'Bearer ' + JSON.parse(token)
          }
          axios.post(`${BASE_API}/products/saved-users/${product?.guid}`)
            .then(
                response => {
                    alert(response.data)
                })
            .catch(error => {
                console.log("ERROR:: ", error.response);
            });
      }else{
        window.location.replace('/signin');
      }
    }
    const addAttribute = (e,opt, col) =>{
      e.preventDefault();
      curentAttribute[col] = opt
      arr.push(curentAttribute);
      
      console.log('add col', col)
      console.log('add opt', opt)
      // console.log('add target', e.target.value)
      // localStorage.setItem('curentAttribute', curentAttribute)
      console.log('add attributes', curentAttribute)
      console.log('arr', arr)
    }
    useEffect(() => {
      fetchProduct();
      fetchAttributes();
    }, []);
  return (
    <>
    
              <section class="padding-y" id='singlepoductinner'
                style={{padding: "50px 0px"}}
                >
                <div class="container">
                
                <div class="row">
                <aside class="col-lg-6">

                    {/* Product Gallery */}
                   <div className='singproduct-imagegallery'>
                   <img src={Productimage} id="grote_image" />
                      <div class="thumbnaill">
                        <img src={Productinnerimage}  alt="" />
                      </div>
                      <div class="thumbnaill">
                        <img src={Productimage}  alt="" />
                      </div>
                      <div class="thumbnaill">
                        <img src={Productinnerimage}  alt="" />
                      </div>
                   </div>
                    {/* product gallery */}
                </aside>
               
                <main class="col-lg-6">
                    <article class="ps-lg-3">
                    <h4 class="title text-dark">{product?.name}</h4>
                    <div class="mb-3"> 
                    <h6>Price: <hr />
                    </h6>
                    <div className='pricesingleproduct'>
                    {product?.sale_price}
                    {(() => {
								  if (!product.sale_price){
                      return (
                        <h5>$ {product?.price}</h5>
                      )
                    }
                    if (product.sale_price){
                      return(
                          <afterSales price={product?.price} salePrice={product?.sale_price} />
                      )	
                    }
								return null;
								})()}
                    {/* <h5><sale><del>$42.44</del></sale>$42.44</h5> */}
                    </div> 
                    </div>
                    {attributes.map(attr =>(
                        attr.attribute.options?
                       <div class="mb-3 size"> 
                         <h6>{attr.attribute.name} : <hr /></h6>
                         {(() => {
                          if (attr.attribute?.name == 'colors' || attr.attribute?.name == 'color' || attr.attribute?.name =='colors varience') {
                            return (
                              <div className='attributes-size'>
                                <div className='row'>
                                {
                                      attr.attribute.type == 'TEXT'
                                     ?(
                                        <input type={attr.attribute.type} id={attr.attribute.id}  name={attr.attribute?.name} onChange={(e) => {curentAttribute[attr.attribute?.name] = e.target.value; console.log('curentAttribute', curentAttribute)}}></input>
                                      )
                                      :attr.attribute.type == 'SELECT'
                                      ? (
                                        <select onChange={(e) => addAttribute(e,e.target.value, attr.attribute?.name)}>
                                          {attr.attribute.options?.map(option => (
                                            <option value={option}>{option}</option>
                                        ))} 
                                        </select>
                                      ):attr.attribute.type == 'CHECKBOX'
                                      ?(
                                        <input type={attr.attribute.type} id={attr.attribute.id} value={attr.attribute?.name} onChange={(e) => {curentAttribute[attr.attribute?.name] = e.target.value; console.log('curentAttribute', curentAttribute)}}   name={attr.attribute?.name}></input>
                                      )
                                      :attr.attribute.type == 'CHECKBOX_GROUP'
                                      ?
                                      (
                                        <>
                                        {attr.attribute.options?.map(option => (
                                         <label onClick={(e) => addAttribute(e,option, attr.attribute?.name)}>
                                          {option}
                                        </label>
                                        ))} 
                                        </>
                                      ):attr.attribute.type == 'RADIO_GROUP'
                                      ?(
                                        <>
                                        {attr.attribute.options?.map(option => (
                                          <>
                                           <div   className={option} onClick={(e) => addAttribute(e,option, attr.attribute?.name)}>&nbsp;</div>
                                          </>
                                          ))} 
                                        </>
                                      )
                                      :('')
                                }
                                  
                                </div>{/*  <a href="#" key={option} onClick={(e) => addAttribute(e,option, attr.attribute?.name)}><div   className={option}>{option}</div></a>  */}
                              </div>
                            )
                          }else{
                            return (
                              <div className='attributes-size'>
                                 <div className='row'>
                                 {
                                      attr.attribute.type == 'TEXT'
                                     ?(
                                        <input type={attr.attribute.type} id={attr.attribute.id} onChange={(e) => {curentAttribute[attr.attribute?.name] = e.target.value; console.log('curentAttribute', curentAttribute)}}  name={attr.attribute?.name} />
                                      )
                                      :attr.attribute.type == 'SELECT'
                                      ? (
                                        <select onChange={(e) => addAttribute(e,e.target.value, attr.attribute?.name)}>
                                          {attr.attribute.options?.map(option => (
                                            <option value={option} >{option}</option>
                                        ))} 
                                        </select>
                                      ):attr.attribute.type == 'CHECKBOX'
                                      ?(
                                        <label>
                                          <input type={attr.attribute.type} id={attr.attribute.id} value={attr.attribute?.name} onChange={(e) => {curentAttribute[attr.attribute?.name] = e.target.value; console.log('curentAttribute', curentAttribute);}}   name={attr.attribute?.name}></input>
                                        </label>
                                      )
                                      :attr.attribute.type == 'CHECKBOX_GROUP'
                                      ?
                                      (
                                        <>
                                        {attr.attribute.options?.map(option => (
                                          // <label>
                                          //   <input type='checkbox' name={attr.attribute?.name} value={option} onChange={(e) => addAttribute(e,option, attr.attribute?.name)}/>
                                          //   {option}
                                          // </label>
                                          <label onClick={(e) => addAttribute(e,option, attr.attribute?.name)}>
                                            {option}
                                          </label>
                                        ))} 
                                        </>
                                      ):attr.attribute.type == 'RADIO_GROUP'
                                      ?(
                                        <>
                                        {attr.attribute.options?.map(option => (
                                          <>
                                            <label><input type='radio' value={option} name={attr.attribute?.name} onChange={(e) => addAttribute(e,option, attr.attribute?.name)}/>
                                              <div className={option}>&nbsp;</div>
                                            </label>
                                          </>
                                          ))} 
                                        </>
                                      )
                                      :('')
                                }
                                {/* {attr.attribute.options.map(option =>(
                               
                                    <a href="#" key={option}><label  onClick={(e) => addAttribute(e,option, attr.attribute?.name)}>{option}</label></a>
                                  
                                ))} */}
                              </div>
                              </div>
                            )
                          }
                        })()}
                         {/* */}
                         </div>
                       :
                       <div class="mb-3 size"> 
                          <h6>{attr.attribute.name} : <hr /></h6>
                          {
                                      attr.attribute.type == 'TEXT'
                                     ?(
                                        <input type={attr.attribute.type} id={attr.attribute.id} onChange={(e) => {curentAttribute[attr.attribute?.name] = e.target.value; console.log('curentAttribute', curentAttribute);}}  name={attr.attribute?.name} />
                                      )
                                      :attr.attribute.type == 'SELECT'
                                      ? (
                                        <select onChange={(e) => addAttribute(e,e.target.value, attr.attribute?.name)}>
                                          {attr.attribute.options?.map(option => (
                                            <option value={option} >{option}</option>
                                        ))} 
                                        </select>
                                      ):attr.attribute.type == 'CHECKBOX'
                                      ?(
                                        <label>
                                          <input type={attr.attribute.type} name={attr.attribute?.name} id={attr.attribute.id} value={attr.attribute?.name} onChange={(e) => {curentAttribute[attr.attribute?.name] = e.target.value; console.log('curentAttribute', curentAttribute);}}></input>
                                        </label>
                                      )
                                      :attr.attribute.type == 'CHECKBOX_GROUP'
                                      ?
                                      (
                                        <>
                                        {attr.attribute.options?.map(option => (
                                          <label onClick={(e) => addAttribute(e,option, attr.attribute?.name)}>
                                            {option}
                                          </label>
                                        ))} 
                                        </>
                                      ):attr.attribute.type == 'RADIO_GROUP'
                                      ?(
                                        <>
                                        {attr.attribute.options?.map(option => (
                                          <>
                                            <label><input type='radio' name={attr.attribute?.name} onChange={(e) => addAttribute(e,option, attr.attribute?.name)} value={option}/>
                                              <div className={option}>&nbsp;</div>
                                            </label>
                                          </>
                                          ))} 
                                        </>
                                      )
                                      :('')
                                }
                          {/* {
                                attr.attribute.type == 'TEXT' ? (
                                  <input type={attr.attribute.type} id={attr.attribute.id}  name="contact"></input>

                                          ) :("")
                            } */}
                          {/* {() => {
                            if (attr.attribute.type == 'TEXT'){
                              <>Text</>
                              // <input type={} id={attr.attribute.id}  name="contact"></input>
                            }else{
                              <>not Text</>
                            }
                           }} */}
                        </div>
                            ))}
                    {/* <div class="mb-3 size"> 
                    <h6>Size Available : <hr />
                    </h6>
                    <div className='attributes-size'>
                        <div className='row'> */}
                            
                            {/* <label className='selected'>12</label>
                            <label>Small</label>
                            <label>Medium</label>
                            <label>Large</label>
                            <label>SLarge</label>
                            <label>MLarge</label>
                            <label>XL</label> */}
                       
                        {/* </div>
                    </div>
                    </div> */}

                    {/* <div class="mb-3 size"> 
                    <h6>Colors Varience: <hr />
                    </h6>
                    <div className='attributes-size'>
                        <div className='row'>
                        <a href=""><img src={Gallery1} /></a>
                        <a href=""><img src={Gallery2} /></a>
                        <a href=""><img src={Gallery3} /></a>
                        <a href=""><img src={Gallery4} /></a>
                        <a href=""><img src={Gallery5} /></a>
                        <a href=""><img src={Gallery6} /></a>
                        <a href=""><img src={Gallery7} /></a>
                        </div>
                    </div>
                    </div> */}


                    <div class="mb-3 size"> 
                    <h6>Quantity : <hr />
                    </h6>
                    </div> 
                    <div class="row mb-4"> 
                    <div class="col-md-4 col-6 mb-3">
                    <div class="input-group input-spinner">
                        <button class="btn btn-icon btn-light" type="button"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                        <path d="M19 13H5v-2h14v2z"></path>
                        </svg>
                        </button>
                        <input class="form-control text-center" placeholder="" value="14"/>
                        <button class="btn btn-icon btn-light" type="button"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                        </button>
                    </div> 
                    </div> 
                    </div> 
                
                    <div className='buynowbutton'><a href="/myshoppingcart" class="btn  btn-primary"> Buy It Now</a></div>
                    <div className='cart-wishlistbutton'>
                    <a href="#" onClick={addCart} class="btn  btn-warning"> <i class="me-1 fa fa-shopping-basket"></i> Add to Cart </a><br />
                    <a href="#" onClick={addWishList} class="btn  btn-light"> <i class="me-1 fa fa-heart"></i> Save to wishlist </a></div>
                    
                    </article> 
                </main> 
                </div> 
                
                </div> 
                </section>
                
                <section class="tabs-products">
                <div class="container">
                <div class="row">
                  
              
                <div class="card">
                    <header class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_specs" data-bs-toggle="tab" class="nav-link active">About the product</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_reviews" data-bs-toggle="tab" class="nav-link">Ratings & reviews</a>
                    </li>
                    
                    </ul>
                    </header>
                    <div class="tab-content">
                    <article id="tab_specs" class="tab-pane show active card-body">
                   <div className='product-information'>
                   <h2>Product Information</h2>
                   <Aboutproducttab product={product}/>
                   </div>
                   <div className='product-seller-info'
                   style={{padding: "40px 0px"}}
                   
                   >
                   <h2>Product Info By Seller</h2>
                   <Productinfoseller />
                   </div>
                    </article> 
                    <article id="tab_reviews" class="tab-pane card-body">
                        <div className='reviews-part'>
                            <Reviews />
                        </div>
                    </article>
                  
                    </div>
                </div>
              
                    
                    
                </div>
                
                <br/><br/>
                
                </div>
                </section>

                {/* RELATED PRODUCTS */}

                <section id='relatedproducts'>
                <RelatedProducts guid={product.guid} />
                </section>
                {/* RELATED PRODUCTS */}
    
    </>
  )
}

export default Singleproductinner