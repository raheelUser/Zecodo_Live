import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import LoginImage from '../../Images/userimages/loginverification/image.png'
import Signinformbackground from '../../Images/userimages/signinform/background.jpg'
import Leftarrow from '../../Images/userimages/loginverification/leftarrow.png'

var Signinformcss = {
    backgroundImage: `url(${Signinformbackground})`,
    padding: "80px 0px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};
var Signinimagecss = {
    width: "100%",
    height: "100%"
    };

const Verification = () => {
  return (
    <>
       {/* HEADER */}
       <Header />
        {/* HEADER */}
    <section id='loginverification'
    style={Signinformcss}
    >
     
        <div className='container'>
            <div className='row'>
                <div className='col-7'>
                    <div className='emailverification'>
                        <div className='verifyheading'>
                            <h4><a href="/signin"><img src={Leftarrow} /></a>Verify</h4>
                            <hr />
                        </div>
                        <div className='loginverifyheading'>
                            <h2>Login Verfication</h2>
                            <p>Enter The 4 digit one time Passcode sendt to your <span>Email : cust***@mail.com</span></p>
                          
                            <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                        <input class="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" />
                        <input class="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" />
                        <input class="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" />
                        <input class="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                    </div>
                    <h5><a href="#">Resend Code (20 )</a></h5>
                    <button>
                    Verify
                    </button>
                  
                        </div>
                    </div>
                </div>
                <div className='col-5'>
                    <div className='signinimage'>
                        <img
                        style={Signinimagecss}
                        src={LoginImage} />
                    </div>
                </div>
            </div>
        </div>
    </section>
     {/* FOOTER */}
     <Footer />
     {/* FOOTER */}
    </>
  )
}

export default Verification