import React from "react";
import Subscribebackground from '../../Images/Shipping/signupbackground.png'
import SubscribeButton from '../../Images/Subscribe/subscribebutton.png'
import SubscribeEmail from '../../Images/Subscribe/subscibeemail.png'


var SubsribeImage = {
    backgroundImage: `url(${Subscribebackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

var Submitcss = {
    backgroundImage: `url(${SubscribeButton})`,
};

var Subscribehr = {
    color: "#fff",
    opacity: "1",
    margin: "40px 0px"
};

const Subscribesignup = () => {

    return (

        <>
        <section id="subscribe-home"
        style={SubsribeImage}>
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        
                    </div>

                    <div className="col-5"
                    style={{padding:"40px 0px 40px 0px"}}>
                            <h2
                            style={{color: "#F9B300"}}
                            >Subcribe To News Letter </h2>
                            <p
                            style={{color:"#000000"}}
                            >Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
                                nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat Ustrude</p>
                    <div className="subscribe-input">
                    <div className="subscribeemail">
						<img src={SubscribeEmail} /> 
					</div>
                    <input placeholder="Your Email Address"/>
                    <button type="submit"
                    style={Submitcss}
                    >Send</button>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );

};

export default Subscribesignup;