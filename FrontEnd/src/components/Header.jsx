import React, { useEffect, useState } from "react";
import Logo  from "../Images/zecodo.png";
import Cart from "../Images/cart.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GoogleLens from "../Images/lenscamera.png";
import Shipping from "../Images/shipping.png";
import Tmail from "../Images/tmail.png";
import Jd from "../Images/jd.png";
import Bell from "../Images/userimages/notification.png";
import UserIcon from "../Images/userimages/usericon.png";
import drop1 from "../Images/userimages/1.png";
import drop2 from "../Images/userimages/2.png";
import drop3 from "../Images/userimages/3.png";
import drop4 from "../Images/userimages/4.png";
import drop5 from "../Images/userimages/5.png";
import drop6 from "../Images/userimages/6.png";
import drop7 from "../Images/userimages/7.png";
import drop8 from "../Images/userimages/8.png";
import drop9 from "../Images/userimages/9.png";
import drop10 from "../Images/userimages/10.png";
import drop11 from "../Images/userimages/11.png";
import UserSignin from './Usersignin/UserSignin'
import AfterSignIn from './Usersignin/AfterSignIn'
import Autocomplete from './Helpers/Autocomplete'
const Header = () => {
	const [user, setUser] = useState()
	const _handleChange = (e) => {
		localStorage.setItem('currency', e.target.value)
      };
	const handleChange =(e) =>{
		localStorage.setItem('language', e.target.value)
	}
	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			setUser(JSON.parse(loggedInUser));
		}
	}, []);
	return (
		<>
			<header>
				<div className="header-inner logged-in">
					<div className="sub-header">
							<div className="container">
								<div className="row align-items-center">
									<div className="col">
									</div>
									<div className="col">
										<p
										style={{ textAlign: "center" }}
										>Free Returns within 30 Days (Including Shipping Fee)</p>
									</div>
									<div className="col">
										<div className="language-cart">
											<ul className="main-sub-list">
												<li>
												<select onChange={handleChange} name="language" id="translator"> 
												<option value="ENG" selected="true">ENG</option>
												 <option value="SPN">SPN</option>
												   </select>
												</li>
												
												<li>
												<select onChange={_handleChange} name="currency" id="currencyswitcher"> 
												<option value="$" selected="true">USD</option>
												 <option value="£">UK</option>
												   </select>
												</li>
												<li>
													<a href="/myshoppingcart">
														<img src={Cart}/>
													</a>
												</li>
												
											</ul>
										</div>
									</div>
								</div>
								
							</div>
						
					</div>
					<div className="logo-with-search">
				<div className="container">

					<div className="row">

						<div className="col-2 align-self-center">
					<div className="logo-box">
				
						<figure>
							<a href="/">
							<img
								style={{ width: "70%", height: "100%" }}
								src={Logo}
								alt="logo"
							/>
							</a>
						</figure>
					</div>
					</div>

					<div className="col-6 align-self-center">
						<div className="search-bar">
						<Autocomplete items="products" />
					{/* <input placeholder="Search by product name/image/image URL"/>
					<button className="search"><FontAwesomeIcon icon={faSearch} /></button> */}
					<div className="buttonlens">
						<a href="#"><img src={GoogleLens} /> </a>
					</div>
					</div>
					</div>
					<div className="col-4 align-self-center">
						<div className="shipping-signin">
							<ul>
								<li><a href="/shipping"><button><img src={Shipping}/> Shipping Calculator</button></a></li>
								{(() => {
								if (!user){
									return (
										<UserSignin/>
									)
								}
								if (user){
									return(
										<AfterSignIn />
									)	
								}
								
								return null;
								})()}
								{/* <li className="login"><a href="SignIn"><button className="signin">Sign In</button></a></li>
								<li className="logged-in-notification"><span><a href="#"><img src={Bell}/></a></span>
								</li> */}
								{/* <li className="logged-in-usericon">
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
										<li><a className="dropdown-item" href="/"><img src={drop11}/> Sign Out</a></li>
										</ul>
										</div>
										</li> */}
							</ul>
						</div>
						
						</div>

					</div> 

					{/* ROW END */}
					</div>

				</div>

				</div>
			</header>
		</>
	);
};

export default Header;
