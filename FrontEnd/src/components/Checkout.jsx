import React, {
  useEffect,
  useState,
} from 'react'
import Userdashboardmenu from "../components/Usermenus";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ordertotal from "../components/MyShoppingCart/Ordertotal";
import Cartproducts from "../components/MyShoppingCart/Cartproducts";
import Coupon from "../components/MyShoppingCart/Coupon";
import Paywithstripe from "./InternationalorderPaymentfields.jsx/Paywithstripe";
import Paywithpaypal from "./InternationalorderPaymentfields.jsx/Paywithpaypal";
import Stripe from "../Images/userimages/myshoppingorders/internationshipping/stripe.png";
import Paypal from "../Images/userimages/myshoppingorders/internationshipping/paypal.png";
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
BASE_API
} from '../services/Constant'


const Checkout = () => {
  const instance = axios.create();
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState({});
  let currency = localStorage.getItem("currency");
  let token = localStorage.getItem("token");
  let loggedInUser = localStorage.getItem("user");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (loggedInUser) {
    // Perform validation here (e.g., check for empty fields)
    const newErrors = {};
    if (!formData.fname) {
      newErrors.fname = 'First Name is required';
    }
    if (!formData.lname) {
      newErrors.lname = 'Last Name is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile is required';
    }
    if (!formData.zip) {
      newErrors.zip = 'Zip is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if(!formData.company) {
      newErrors.company = 'Tag is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      
      formData.isDefault = formData.isDefault? formData.isDefault : true
      /**
       * //Usage limit exceeded error came but ypu can get locations from this api
       * /location/getCityStatebyPostal/${formData.zip}
       */
      
      // axios.post(`${BASE_API}/location/getCityStatebyPostal/${formData.zip}`)
      //   .then(
      //       response => {
              
              // console.log("add:: ", response);
              axios.defaults.headers = {
                Authorization: 'Bearer ' + JSON.parse(token)
              }
              axios.post(`${BASE_API}/user/saveAddress`, formData)
                  .then(res => {
                  console.log('save addreess',res)
                  // setResponce(res)
              })
              .catch(error => {
                  console.log("ERROR:: ", error);
              });

        //     })
        // .catch(error => {
        //     console.log("ERROR:: ", error);
        // });
    }
  }else{
    window.location.replace('/signin');
}
  };
  const fetchUser = () => {
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
  const fetchStates = () => {
    axios.defaults.headers = {
      Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.get(`${BASE_API}/state`)
        .then(
            response => {
              console.log('state',response.data)
              setStates(response.data);
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
  };
  useEffect(() => {
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      setUser(loggedInUsers);
      fetchUser();
      fetchStates();
    }else{
      window.location.replace('/signin');
    }
  }, []);

  return (
    <>
    
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      <section id="myshoppingcart">
        <div className="container">
          <div className="row">
            <div className="page-title">
              <a href="/myshoppingcart"><FontAwesomeIcon icon={faAngleLeft} /> Checkout</a>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "40px" }}>
            <div className="col-8">
              <Cartproducts />
              <Coupon />

              <div className="row">
                <div className="customerinnerdetails">

                <table>
                    <tr className="adressanddetails">
                        <td><h2>Customer Details</h2></td>
                        <td className="addresbutn"><a href="#"><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" className="addnew">Add New Address</button></a></td>
                    </tr>
                <a href="#"><button>Home</button></a>
                    <tr>
                        <td>Receiver*</td>
                        <td className="last-col">{customer?.fname}&nbsp;{customer?.lname}</td>
                    </tr>
                    <tr>
                        <td>Regions*</td>
                        <td className="last-col">{customer?.country}</td>
                    </tr>
                    <tr>
                        <td>Address*</td>
                        <td className="last-col">{customer?.address}</td>
                    </tr>
                    <tr>
                        <td>Mobile*</td>
                        <td className="last-col">{customer?.mobile}</td>
                    </tr>
                    <tr>
                        <td>Post/Zip Code*</td>
                        <td className="last-col">{customer?.zip}</td>
                    </tr>
                    
                </table>
                </div>
              </div>

              {/* PAYMENT DETAILS */}
              <div
                class="accordion"
                id="accordionExample3"
                style={{ padding: "40px 0px" }}
              >
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#Pay1"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Pay with Stripe <img src={Stripe} />
                    </button>
                  </h2>
                  <div
                    id="Pay1"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample3"
                  >
                    <div class="accordion-body">
                      <Paywithstripe />
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#Pay2"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Pay With Paypal <img src={Paypal} />
                    </button>
                  </h2>
                  <div
                    id="Pay2"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample3"
                  >
                    <div class="accordion-body">
                      <Paywithpaypal />
                    </div>
                  </div>
                </div>
              </div>
              {/* PAYMENT DETAILS END */}
            </div>
            <div className="col-4">
              <Ordertotal />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
      {/* FOOTER */}

      {/* MODAL */}
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Address</h5>
      </div>
      <div class="modal-body">
      <form onSubmit={handleSubmit}>
        <div className='reciever'>

          <h3>Receiver*</h3>
          <input
            placeholder='First name :'
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
            />
            {errors.fname && <p className="error">{errors.fname}</p>}
          {/* <input type="text" placeholder='First name'/> */}
          {/* <input type="text" placeholder='Last name'/> */}
          <input
            placeholder='Last name :'
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
            />
            {errors.lname && <p className="error">{errors.lname}</p>}

        </div>

        <div className='reciever'
        >
          <h3>Regions*</h3>
          <input
            placeholder='Country :'
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
            />
            {errors.country && <p className="error">{errors.country}</p>}
          {/* <input type="text" placeholder='Country'/> */}
          
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">-- Select State --</option>
            {
            states.length >0
            ?(
                <>
                {states.map(state =>{
                    return (
                      <option value={state.code}>{state.name}</option> 
                    )
                })}
               </>
            )
               :('')
            }
            {/* {states?.map((states) =>{
              <option value={state.code}>{state.name}</option> 
            }            
            )} */}
            
            <option value="CD">CD</option>
          </select>
          {errors.state && <p className="error">{errors.state}</p>}
        </div>
        <div className='reciever'>
          <h3>City*</h3>
          <input
            placeholder='City :'
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
            />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className='reciever'>
          <h3>Address*</h3>
          <input
            placeholder='Address :'
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className='reciever'>
          <h3>Mobile*</h3>
          <input
            placeholder='Mobile :'
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
            />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
          
        </div>
        <div className='reciever'>
          <h3>Email*</h3>
          <input
            placeholder='Email :'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
          {errors.email && <p className="error">{errors.email}</p>}
          
        </div>
        <div className='reciever'>
          <h3>Post/Zip Code*</h3>
          <input
              placeholder='Postal/Zip :'
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
            />
          {errors.zip && <p className="error">{errors.zip}</p>}
        </div>
        <div className='reciever'>
          <h3>Address Tag</h3>
          <input 
            placeholder='Tag :'
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <p className="error">{errors.company}</p>}
        </div>
        <div className='reciever'>
         <p>Popular Tags :</p>
         <ul>
          <li>Home</li>
          <li>Work Place</li>
          <li>School</li>
         </ul>
        </div>
        <div className='reciever'>
         <h3><div class="form-check">
  <input class="form-check-input"  value={formData.isDefault} type="radio" onChange={handleChange} name="flexRadioDefault" id="BrandFilter1" />
  <label class="form-check-label" for="BrandFilter1">
  Set As Default Address
  </label>
</div></h3>
        </div>
        <div className='save-button'>
        <button type="submit">Save</button>
          {/* <a href="#"><button>Save</button></a> */}
        </div>
        </form>
        {/* <div className='reciever'>
          <h3>Receiver*</h3>
          <input type="text" placeholder='First name'/>
          <input type="text" placeholder='Last name'/>
        </div> */}

        {/* <div className='reciever'
        >
          <h3>Regions*</h3>
          <input type="text" placeholder='Country'/>
          <select>
            <option>
            State
            </option>
          </select>
        </div> */}

        {/* <div className='reciever'>
          <h3>Address*</h3>
          <input type="text" />
          
        </div> */}

        {/* <div className='reciever'>
          <h3>Mobile*</h3>
          <input type="text" />
          
        </div>
        <div className='reciever'>
          <h3>Post/Zip Code*</h3>
          <input type="text" />
          
        </div> */}
        {/* <div className='reciever'>
          <h3>Address Tag</h3>
          <input type="text" />
          
        </div>
        <div className='reciever'>
         <p>Popular Tags :</p>
         <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Work Place</a></li>
          <li><a href="#">School</a></li>
         </ul>
        </div> */}

        {/* <div className='reciever'>
         <h3><div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter1" />
  <label class="form-check-label" for="BrandFilter1">
  Set As Default Address
  </label>
</div></h3>
        </div> */}
        {/* <div className='save-button'>
          <a href="#"><button>Save</button></a>
        </div> */}
      </div>
      
    </div>
  </div>
</div>
    </>
  );
};

export default Checkout;
