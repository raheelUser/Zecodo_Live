import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import Subscribe from "../../components/subscribe";
import Bannercard from "../../components/Bannercard";
import ProductCard from "../../components/productcard";



const Userloggedin = () => {
	return (
		<>
		<div className="userloggedin">
			{/* Header Include */}
			<Header />
			{/* Header Include */}

			{/* Header Include */}
			<Banner />
			{/* Header Include */}

			{/* Header Include */}
			<Bannercard />
			{/* Header Include */}

			{/* Header Include */}
			<ProductCard />
			{/* Header Include */}

			{/* Header Include */}
			<Subscribe />
			{/* Header Include */}

      {/* Header Include */}
			<Footer />
			{/* Header Include */}

			</div>
			
		</>
	);
};

export default Userloggedin;
