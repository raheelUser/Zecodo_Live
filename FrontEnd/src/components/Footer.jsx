import React from "react";
import Facebook from '../Images/Footer/facebook.png'
import Instagram from '../Images/Footer/instagram.png'
import Twitter from '../Images/Footer/twitter.png'

var Footercss = {
backgroundColor: "#2A2A2A",
color: "#fff",
};

var Footerwidget = {
	padding: "60px 0px"
};


const Footer = () => {
	return (
		<>
			<footer
			style={Footercss}
			>
				<div className="footer-widget"
				style={Footerwidget}>
				<div className="container">
					<div className="row">
						<div className="col-4">
							<h2>ZECODO</h2>
							<p>Over 350 million offers from around 50,000 dealers in our 
								price comparison mean you have a comprehensive overview
								 of the market. No matter what you are looking for, we
								  definitely have it. At the best price. Comprehensive 
								  filter and sorting functions help you to find your 
								  personal offer.</p>
						</div>
						<div className="col-2">
							<div className="nav-menu-footer">
								<h4>Info</h4>
								<ul>
									<li><a href="#">About us</a></li>
									<li><a href="#">Privacy Policy</a></li>
									<li><a href="#">Terms of use</a></li>
								</ul>
							</div>
						</div>
						<div className="col-2">
						<div className="nav-menu-footer">
								<h4>Shop</h4>
								<ul>
									<li><a href="#">How to Shop on Zecodo.</a></li>
									<li><a href="#">Payment Methods</a></li>
									<li><a href="#">Return & Exchange policy</a></li>
								</ul>
							</div>
						</div>
						<div className="col-2">
						<div className="nav-menu-footer">
								<h4>Customer Service</h4>
								<ul>
									<li><a href="#">Call at : +1505156984</a></li>
									<li><a href="#">Email at : abc@zecodo.com</a></li>
									
								</ul>
							</div>
						</div>
						<div className="col-2">
						<div className="nav-menu-footer">
								<h4>Social links</h4>
								<ul>
									<li><a href="#"><img src={Facebook}/> Facebook</a></li>
									<li><a href="#"><img src={Instagram}/> Instagram</a></li>
									<li><a href="#"><img src={Twitter}/> Twitter</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>

				<div className="footer-bottom">
					<div className="container">
					<p>Copyright © 2023 ZECODO. </p>
					</div>
				</div>

			</footer>
		</>
	);
};

export default Footer;
