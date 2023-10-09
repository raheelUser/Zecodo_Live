import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios'
import { BASE_API } from '../../services/Constant';


const Signupforminput = () => {
  const [responce,setResponce] = useState([])
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here (e.g., check for empty fields)
    const newErrors = {};
    if (!formData.fname) {
      newErrors.fname = 'First Name is required';
    }
    if (!formData.lname) {
      newErrors.lname = 'Last Name is required';
    }
    if (!formData.username) {
      newErrors.username = 'User Name is required';
    }
  if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Confirm Password is required';
    }
    if (formData.password_confirmation != formData.password) {
      newErrors.password_confirmation = 'Password not Matched!';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // You can submit the form or perform further actions here
      // console.log('Form submitted:', formData);
       axios.post(`${BASE_API}/register`, formData)
            .then(res => {
            setResponce(res.data.message)
        })
    }
  };

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <input
          placeholder='First Name :'
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
          {errors.fname && <p className="error">{errors.fname}</p>}
        <input
          placeholder='Last Name :'
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
          {errors.lname && <p className="error">{errors.lname}</p>}
        <input
          placeholder='Username :'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <input
          placeholder='Email :'
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
          placeholder='Password :'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
          placeholder='Confirm Password :'
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && <p className="error">{errors.password_confirmation}</p>}
        </div>
        <div className='staysign-forgot'>
            <ul>
                {/* <li>
                <input type="checkbox" id="staysign" name="staysign" value="staysign"></input>Stay signed In
                </li> */}
                <li className='forgot'><a href="#">Forgot Password ?</a></li>
            </ul>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupforminput;