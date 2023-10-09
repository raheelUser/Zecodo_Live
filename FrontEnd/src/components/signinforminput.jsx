import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from "axios";
import Header from './Header';
// const BASE_API = "http://localhost:8000/api";
import {BASE_API} from '../services/Constant'

const Form = () => {
  const error= '';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // You can submit the form or perform further actions here
      axios.post(`${BASE_API}/auth/login`, formData)
          .then(
              response => {
                console.log('response', response);
                if(response.data == "NotExits"){
                  alert(response.data)
                }else{
                  localStorage.setItem('user', JSON.stringify(response.data.data))
                  localStorage.setItem('token', JSON.stringify(response.data.token))
                  window.location.replace('/userloggedin');
                }
              })
          .catch(error => {
            alert(error.response.data.message);
              });
    }
  };


  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
         
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
        </div>
        <div className='staysign-forgot'>
            <ul>
                <li>
                <input type="checkbox" id="staysign" name="staysign" value="staysign"></input>Stay signed In
                </li>
                <li className='forgot'><a href="#">Forgot Password ?</a></li>
            </ul>
        </div>
        {error}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Form;