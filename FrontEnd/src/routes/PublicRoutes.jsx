import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Userloggedin from "../pages/User/UserLoggedin";
import "../assets/css/App.css"
import SignIn from '../pages/User/SignIn'
import Verification from '../pages/User/LoginVerification'
import MyProfile from '../pages/User/MyProfile'
import MyWishlist from '../pages/User/MyWishlist'
import MySubscription from '../pages/User/MySubscription'
import SingleProduct from '../product/SingleProduct'
import ProductPage from '../product/ProductPage'
import MyMessage from '../pages/User/MyMessage'
import MyWallet from '../pages/User/MyWallet'
import MySetting from '../pages/User/MySetting'
import MyAddress from '../pages/User/MyAddress'
import MyPaymentMethods from '../pages/User/MyPaymentMethods'
import MyShoppingCart from '../pages/User/MyShoppingCart'
import Shippingdetails from '../pages/Shipping/Shipping'
import SignUp from '../pages/User/SignUp'
import AllShopingOrders from '../pages/User/AllShopingOrders'
import MyWarehouse from '../pages/User/MyWarehouse'
import Checkout from '../components/Checkout'
import FeturedProductPage from '../product/Featured/FeturedProductPage'
import "../assets/js/main"
import $ from 'jquery';



const PublicRoutes = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/userloggedin" element={<Userloggedin />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/loginverification" element={<Verification />} />
					<Route path="/myprofile" element={<MyProfile />} />
					<Route path="/mywishlist" element={<MyWishlist />} />
					<Route path="/mysubscription" element={<MySubscription />} />
					<Route path="/singleproduct/:id" element={<SingleProduct />} />
					<Route path="/productpage/:guid" element={<SingleProduct />} />
					<Route path="/productpage" element={<ProductPage />} />
					<Route path="/feturedproducts" element={<FeturedProductPage />} />
					<Route path="/mymessage" element={<MyMessage />} />
					<Route path="/mywallet" element={<MyWallet />} />
					<Route path="/mysetting" element={<MySetting />} />
					<Route path="/myaddress" element={<MyAddress />} />
					<Route path="/mypaymentmethods" element={<MyPaymentMethods />} />
					<Route path="/myshoppingcart" element={<MyShoppingCart />} />
					<Route path="/shipping" element={<Shippingdetails />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/allshoppingorders" element={<AllShopingOrders />} />
					<Route path="/mywarehouse" element={<MyWarehouse />} />
					<Route path="/checkout" element={<Checkout />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default PublicRoutes;
