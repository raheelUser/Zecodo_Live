import React, {
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { BASE_API } from '../../services/Constant';

const Postaddress = () => {
  const instance = axios.create();
  let token = localStorage.getItem("token");
  let loggedInUser = localStorage.getItem("user");
  const [formData, setFormData] = useState({});
  const [responce,setResponce] = useState([])
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState({});
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  const handleRadioChange = (e) =>{
      formData.isDefault = true
  }
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
        
        formData.isDefault = formData.isDefault ? formData.isDefault : false
        /**
         * //Usage limit exceeded error came but ypu can get locations from this api
         * /location/getCityStatebyPostal/${formData.zip}
         */
        
        // axios.post(`${BASE_API}/location/getCityStatebyPostal/${formData.zip}`)
        //   .then(
        //       response => {
                
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
      fetchStates();
    }, []);

  return (
 <>
 <button
 style={{backgroundColor: "#F9B300"}}
 type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
 Add New Address
</button>
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
        <input class="form-check-input"  type="radio"  onChange={handleRadioChange} name="isDefault" id="BrandFilter1" />
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
      </div>
      
    </div>
  </div>
</div>
</>
  )
}

export default Postaddress