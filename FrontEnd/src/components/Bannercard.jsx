import React from "react";
import Image1 from '../Images/Bannercard/1.png'
import Image2 from '../Images/Bannercard/2.png'
import Image3 from '../Images/Bannercard/3.png'
import Image4 from '../Images/Bannercard/4.png'
import Image5 from '../Images/Bannercard/5.png'
import Image6 from '../Images/Bannercard/6.png'
import Image7 from '../Images/Bannercard/7.png'
 
// var Circlecss = {
//     backgroundImage: `url(${Subscribebackground})`,
// };


const Bannercard = () => {

    return (

        <>
        <section id="bannercard"
        style={{padding:"40px 0px"}}
        >
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="circle">
                            <img src={Image1} />
                            <p>Searching Products</p>
                        </div>
                    </div>
                    <div className="col">
                    <div className="circle">
                    <img src={Image2} />
                    <p>Place order & Pay</p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="circle">
                    <img src={Image3} />
                    <p>Zecodo Surrogate</p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="circle">
                    <img src={Image4} />
                    <p>Products arrival</p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="circle">
                    <img src={Image5} />
                    <p>Pay international</p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="circle">
                    <img src={Image6} />
                    <p>International Shipping</p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="circle">
                    <img src={Image7} />
                    <p>Happy Receipt</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );

};

export default Bannercard;