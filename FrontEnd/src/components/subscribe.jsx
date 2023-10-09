import React, {useState} from 'react';
import axios from 'axios'
import Subscribebackground from '../Images/Subscribe/background.png'
import SubscribeButton from '../Images/Subscribe/subscribebutton.png'
import SubscribeEmail from '../Images/Subscribe/subscibeemail.png'
import { BASE_API } from '../services/Constant';


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

const Subscribe = () => {
    const instance = axios.create();
    const [formData, setFormData] = useState({
        email: '',
      });
    const [responce,setResponce] = useState([])
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
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          // You can submit the form or perform further actions here
        //   console.log('Form submitted:', `${BASE_API}/subscription/`);
                axios.post(`${BASE_API}/subscription/store`, formData)
                    .then(res => {
                    setResponce(res.data.message)
                })
        }
      };

    return (

        <>
        <section id="subscribe-home"
        style={SubsribeImage}>
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        
                    </div>

                    <div className="col-5"
                    style={{padding:"160px 0px 80px 0px"}}>
                        <h1><span>Find the Best Products From China<br /></span>
                            <strong><em>Boost</em> your Life with us!</strong></h1>
                            <hr
                            style={Subscribehr}
                            />
                            <h2>Subcribe To News Letter </h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
                                nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat Ustrude</p>
                    <div className="subscribe-input">
                    <div className="subscribeemail">
						<img src={SubscribeEmail} /> 
					</div>
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
                        {responce}
                        <button type="submit"
                        style={Submitcss}
                        >Send</button>
                    </form>
                    {/* <input placeholder="Your Email Address"/>
                    <button type="submit"
                    style={Submitcss}
                    >Send</button> */}
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );

};

export default Subscribe;