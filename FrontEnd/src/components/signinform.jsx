/*global FB*/
import React, { useEffect, useState } from "react"
import axios from "axios";
import Signinimage from '../Images/userimages/signinform/signin.png'
import Signinformbackground from '../Images/userimages/signinform/background.jpg'
import Form from '../components/signinforminput'
import Orimage from '../Images/userimages/signinform/or.png'
import Facebook from '../Images/userimages/signinform/facebook.png'
import Apple from '../Images/userimages/signinform/apple.png'
import Google from '../Images/userimages/signinform/google.png'
import { GoogleLogin } from '@react-oauth/google';
import {BASE_API} from '../services/Constant'
import FacebookLogin from 'react-facebook-login';
import { Card, Image, Button } from 'react-bootstrap';
var Signinformcss = {
    backgroundImage: `url(${Signinformbackground})`,
    padding: "80px 0px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

var Signinimagecss = {
    backgroundImage: `url(${Signinimage})`,
    padding: "80px 0px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

const Signinform = () => {
    const instance = axios.create();
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');
    const [user, setUser] = useState([]);
   
    const responseFacebook = (response) => {
        // console.log('fb_response', response);
        axios.post(`${BASE_API}/auth/facebook-login`, response)
            .then(
                response => {
                    console.log('responce from back end', response)
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                    window.location.replace('/userloggedin');
                })
            .catch(error => {
                    alert(error.response);
                });
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      }
      const fbLogin = (response) => {
        response.preventDefault();
        FB.login((response) =>
            axios.post(`${BASE_API}/auth/facebook-login`, response.authResponse)
            .then(
                response => {
                    // console.log('responce from back end', response)
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                    window.location.replace('/userloggedin');
                })
            .catch(error => {
                    console.log("ERROR:: ",error.response);
                })
        , {scope: 'user_gender,email'})
      }
      const fbInit = (response) => {
        window.fbAsyncInit = function () {
            FB.init({
              appId: "855777062581776",
            //   cookie: true, 
              xfbml: true,
            //   status: true,
            //   oauth: true,
            //   channelUrl: 'https://localhost:3000/',
              version: "v17.0",
            });
            FB.AppEvents.logPageView();
          };
        
          (function (d, s, id) {
            var js,
              fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
              return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          })(document, "script", "facebook-jssdk");
      };
      const getUserData = () =>{
        const loggedInUser = localStorage.getItem("user");
            if (loggedInUser) {
            const  loggedInUsers = JSON.parse(loggedInUser);
                setUser(loggedInUsers);
            }
        }
        const checkLogin = () =>{
            if(!user)
            {
                window.location.replace('/myprofile');
            }
        }
      useEffect(() => {
        fbInit();
        getUserData();
        checkLogin();
      }, []);
  return (
    <>
    <section id='sign-in-form'
    style={Signinformcss}
    >
        <div className='container'>
            
            <div className='row'>
                <div className='col-7'>
                    <div className='signupbutton'>
                        <a href="/signup"><button>Sign Up</button></a>
                    </div>
                    <div className='form-signin'>
                        <h2>Welcome!</h2>
                        <p>Login to Track your camparing, or create your <br />acount to become a member</p>
                        <Form />
                        <div className='or'>
                        <img src={Orimage}/>
                    </div>
                    <div className='login-with-socialmedias'>
                    {/* <GoogleOAuthProvider clientId='564932564531-b9uchkvfldj3u1drt0fvf3l4e6ce8hu1.apps.googleusercontent.com'>
                        <Button onClick={() => googleLogin()}>Sign in with Google 🚀 </Button>
                    </GoogleOAuthProvider> */}
                    <GoogleLogin
                            auto_select
                            onSuccess={credentialResponse => {
                                axios.post(`${BASE_API}/auth/google-login`, credentialResponse)
                                .then(
                                    response => {
                                        localStorage.setItem('user', JSON.stringify(response.data.data))
                                        localStorage.setItem('token', JSON.stringify(response.data.token))
                                        window.location.replace('/userloggedin');
                                    })
                                .catch(error => {
                                        console.log("ERROR:: ",error.response);
                                    });
                                }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        {/* <a href="#"><img
                        style={{width: "100%", height: "100%"}}
                        src={Google}/></a> */}
                        <FacebookLogin
                                appId="855777062581776"
                                autoLoad={true}
                                fields="id,name,email,picture"
                                // scope="public_profile,email,user_friends"
                                scope={['email']}
                                callback={responseFacebook}
                                icon="fa-facebook" />
                        {/* <Card style={{ width: '600px' }}>
                            <Card.Header>
                            { !login && 
                                
                            }
                            { login &&
                                <Image src={picture} roundedCircle />
                            }
                            </Card.Header>
                            { login &&
                            <Card.Body>
                                <Card.Title>{data.name}</Card.Title>
                                <Card.Text>
                                {data.email}
                                </Card.Text>
                            </Card.Body>
                            }
                        </Card> */}
                        {/* <a href="#"><img
                        style={{width: "100%", height: "100%"}}
                        src={Facebook}/></a> */}
                        <a href="#"><img
                        style={{width: "100%", height: "100%"}}
                        src={Apple}/></a>
                    </div>
                    </div>
                    
                </div>
                <div className='col-5'
                style={Signinimagecss}
                >
                    <div className='signinimage'
                    style={{display: "none"}}
                    >
                        <img
                        style={Signinimagecss}
                        src={Signinimage} />
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Signinform