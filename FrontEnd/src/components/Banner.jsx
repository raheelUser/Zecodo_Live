import React from "react";
import Bannerimage from "../Images/Bannerslider/banner.png";
import Speakerimage from "../Images/Bannerslider/speaker.png";
import Droneimage from "../Images/Bannerslider/drone.png";
import Phoneimage from "../Images/Bannerslider/phone.png";
import Categoriesmenus from '../components/Categoriesmenus'


var sectionStyle = {
    backgroundImage: `url(${Bannerimage})`,
    padding: "0px 0px 60px 0px"
};

var ImageStyle = {
    width: "100%",
    height: "100%"
};
var Phoneimagestyle = {
    width: "70%",
    height: "100%"
};

const Banner = () => {
	return (
		<>
			<section id="banner-slider"
            style={ sectionStyle }>
                <div className="innerbannersection">
                    <div className="container">
                        <Categoriesmenus />
                    <div className="row">
                    <div className="col-3 align-self-center">
                    <div className="phoneimage">
                            <img style={ Phoneimagestyle }
                            src={Phoneimage}/>
                        </div>
                    </div>
                    <div className="col-6 align-self-center">
                        <div className="speakerimage">
                            <img 
                             src={Speakerimage}/>
                        </div>
                        <h2>ZECODO</h2>
                        <h3>No Compromise on Quality.</h3>
                        <h1>We Only Offer Premium Chinese Brands</h1>
                    </div>
                    <div className="col-3 align-self-center">
                    <div className="droneimage">
                            <img style={ ImageStyle }
                             src={Droneimage}/>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </section>
		</>
	);
};


export default Banner;