import React from 'react'
import Signinimage from '../../Images/userimages/signinform/signin.png'
import Signinformbackground from '../../Images/userimages/signinform/background.jpg'
import Signupforminput from '../../components/Registration/Signupforminput'
import Orimage from '../../Images/userimages/signinform/or.png'
import Facebook from '../../Images/userimages/signinform/facebook.png'
import Apple from '../../Images/userimages/signinform/apple.png'
import Google from '../../Images/userimages/signinform/google.png'


var Signinformcss = {
    backgroundImage: `url(${Signinformbackground})`,
    padding: "80px 0px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

var Signupcol5image = {
    backgroundImage: `url(${Signinimage})`,
    padding: "80px 0px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

var Signinimagecss = {
width: "100%",
height: "100%"
};

const Singupform = () => {
  return (
    <>
    <section id='sign-in-form'
    style={Signinformcss}
    >
        <div className='container'>
            
            <div className='row'>
                <div className='col-7'>
                    <div className='signupbutton'>
                        <a href="/signin"><button>Sign In</button></a>
                    </div>
                    <div className='form-signin'>
                        <h2>Welcome!</h2>
                        <p>Sign Up to Track your camparing, or create your <br />acount to become a member</p>
                        <Signupforminput />
                        <div className='or'>
                        <img src={Orimage}/>
                    </div>
                    <div className='login-with-socialmedias'>
                        <a href="#"><img
                        style={{width: "100%", height: "100%"}}
                        src={Google}/></a>
                        <a href="#"><img
                        style={{width: "100%", height: "100%"}}
                        src={Facebook}/></a>
                        <a href="#"><img
                        style={{width: "100%", height: "100%"}}
                        src={Apple}/></a>
                    </div>
                    </div>
                    
                </div>
                <div className='col-5 signupcol'
                style={Signupcol5image}
                >
                    
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Singupform