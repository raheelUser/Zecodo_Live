import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from "axios";
import Bell from "../../Images/userimages/notification.png";
import UserIcon from "../../Images/userimages/usericon.png";
import drop1 from "../../Images/userimages/1.png";
import drop2 from "../../Images/userimages/2.png";
import drop3 from "../../Images/userimages/3.png";
import drop4 from "../../Images/userimages/4.png";
import drop5 from "../../Images/userimages/5.png";
import drop6 from "../../Images/userimages/6.png";
import drop7 from "../../Images/userimages/7.png";
import drop8 from "../../Images/userimages/8.png";
import drop9 from "../../Images/userimages/9.png";
import drop10 from "../../Images/userimages/10.png";
import drop11 from "../../Images/userimages/11.png";
import { googleLogout } from '@react-oauth/google';
import {BASE_API} from "../../services/Constant"
//{user}
const AfterSignIn = () => {
    const [user, setUser] = useState()
    const handleLogout = (e) => {
		e.preventDefault();
		var token =localStorage.getItem('token');
		axios.post(`${BASE_API}/auth/logout`,{
			headers: {
				// 'Content-Type': 'application/json;charset=utf-8',
				// 'Authorization': 'Bearer ' + token ,
				// 'method': 'GET'
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer '+ JSON.parse(token)
			}
		})
          .then(
              response => {
                console.log('response', response);
				setUser({});
                googleLogout();
				localStorage.clear();
                  window.location.replace('/');
              })
          .catch(error => {
                  console.log("ERROR:: ",error.response);
              });
	  };
    return (
		<> 
        {/* className="logged-in-notification" */}
    <li ><span><a href="#"><img src={Bell}/></a></span>
    </li>
    <li>
        <div className="dropdown">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                <img src={UserIcon}/></button>
                <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/myprofile"><img src={drop1}/> My Profile</a></li>
                <li><a className="dropdown-item" href="/allshoppingorders"><img src={drop2}/> My Orders</a></li>
                <li><a className="dropdown-item" href="/mywallet"><img src={drop3}/> My Wallet</a></li>
                <li><a className="dropdown-item" href="/mywishlist"><img src={drop4}/> My Wish List</a></li>
                <li><a className="dropdown-item" href="/myshoppingcart"><img src={drop5}/> My Shopping Cart</a></li>
                <li><a className="dropdown-item" href="/myaddress"><img src={drop6}/> My Addresses</a></li>
                <li><a className="dropdown-item" href="/mypaymentmethods"><img src={drop7}/> My Payment Methods</a></li>
                <li><a className="dropdown-item" href="/mysetting"><img src={drop8}/> My Settings</a></li>
                <li><a className="dropdown-item" href="/mymessage"><img src={drop9}/> My Message</a></li>
                <li><a className="dropdown-item" href="/mysubscription"><img src={drop10}/> My Subscriptions</a></li>
                <li><a className="dropdown-item" onClick={handleLogout} href="/"><img src={drop11}/> Sign Out</a></li>
                </ul>
                </div>
                </li>
        </>

  );
};

export default AfterSignIn;