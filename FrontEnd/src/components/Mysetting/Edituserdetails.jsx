import React, {
  useState,
  useEffect,
} from 'react'
import axios from 'axios'
import { BASE_API } from '../../services/Constant';

const Edituserdetails = () => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const getUserDetails = () =>{
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
  const  loggedInUsers = JSON.parse(loggedInUser);
      setUser(loggedInUsers);
  }
}
const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};
  if (!formData.password) {
    newErrors.password = 'Password is required';
  }
  if (!formData.oldpassword) {
    newErrors.oldpassword = 'Old Password is required';
  }
  if (!formData.password_confirmation) {
    newErrors.password_confirmation = 'Confirm Password is required';
  }
  if (formData.password_confirmation != formData.password) {
    newErrors.password_confirmation = 'Password not Matched!';
  }
  let data={
    "email": user.email,
    "password":formData.password_confirmation
  }
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    // You can submit the form or perform further actions here
    // console.log('Form submitted:', formData);
     axios.post(`${BASE_API}/password/reset`, data)
          .then(res => {
          alert(res.data)
      })
  }

}
const reset =() =>{

}
useEffect(() => {
  getUserDetails();
}, []);
  return (
    <>
      <form id="edit-user-details" onSubmit={handleSubmit} style={{ padding: "10px 0px" }}>
        <br />
        <label for="guid">
          Username <span>( not changeable )</span>
          <input
            type="text"
            id="guid"
            name="guid"
            value={user?.guid}
            placeholder="UserID#5dw61ef6e84"
          />
        </label>
        <br />
        <label for="name">
          Display Name
          <input 
            type="text"
            id="name"
            value={user?.name}
            name="name"/>
        </label>
        <br />
        <label for="fname">
          First Name
          <input type="text" id="fname"  value={user?.fname} name="fname"  placeholder="John Doe" />
        </label>
        <br />
        <label for="lname">
          Last Name
          <input type="text" id="lname" value={user?.lname} name="lname" placeholder="John Doe" />
        </label>
        <br />
        <label for="email">
          Email Address
          <input
            type="label"
            id="email"
            name="email"
            value={user?.email}
            placeholder="johndoe@ymail.com"
          />
        </label>
        <div className="chanepassword">
          <h2>Change Password</h2>
          <div className="changepasswordfields">
            <h3>Create a new Password</h3>
            <input
              type="password"
              id="oldpassword"
              name="oldpassword"
              placeholder="Old Password"
              value={formData.oldpassword}
              onChange={handleChange}
            />
            {errors.oldpassword && <p className="error">{errors.oldpassword}</p>}
            <input
             placeholder='New Password'
             type="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
             type="password"
             name="password_confirmation"
             value={formData.password_confirmation}
             onChange={handleChange}
              placeholder="Confirm password"
            />
            {errors.password_confirmation && <p className="error">{errors.password_confirmation}</p>}
          <div className="change-password-button">
              <a href="#" onClick={reset}>Cancel</a>
              <br/>
              <a href="#"><button style={{backgroundColor: "#F9B300"}}>Save Password</button></a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edituserdetails;
