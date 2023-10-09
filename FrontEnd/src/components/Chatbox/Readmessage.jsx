import React, {
    useState,
    useEffect,
  } from 'react'
  import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import Highvolumeicon from '../../Images/userimages/mymessage/1.png'
import Messageicon from '../../Images/userimages/mymessage/2.png'
import Boxicon from '../../Images/userimages/mymessage/3.png'

import { BASE_API } from '../../services/Constant';
const Readmessage = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState([]);
    const instance = axios.create();
    let token = localStorage.getItem("token");
    let loggedInUser = localStorage.getItem("user");
    const getUserMessages = () =>{
     
        axios.defaults.headers = {
          Authorization: 'Bearer ' + JSON.parse(token)
        }
        console.log('user',user)
        axios.get(`${BASE_API}/mymessages/self/14`)
            .then(res => {
              console.log('my messages',res.data)
              setMessages(res.data)
        })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
     
     
    }
    const getUserDetails = () => {
        
      let userLogedIn;
      if(loggedInUser){
        userLogedIn= JSON.parse(loggedInUser)
        // console.log(userLogedIn)
        
            setUser(userLogedIn)
            getUserMessages();
        }else{
            //
        }
    }
    useEffect(() => {
        getUserDetails();
        
    }, []);
  return (
    <>
    <div className='read-message'>
        <table className='table'>
            {messages.length > 0? (
                <>
                {messages.map(message => (
                    <tr>
                    <td><img src={Highvolumeicon}/></td>
                    <td><h3>{message.subject}</h3>
                    <p>{message.data} <a className='details' href="#"> Details</a></p>
                        {/* <h6>2023-08-23 <span>09:35 pm</span></h6> */}
                        <h6>{message.created_at}</h6>
                    </td>
                    
                    <td style={{textAlign: "right"}}>
                        <a className='trash' href="#"><FontAwesomeIcon icon={faTrash} /></a>
                        <br />
                        <a className='viewnow' href="#">View Now <FontAwesomeIcon icon={faArrowRight}/></a>
                    </td>
                </tr>
                    ))}
                </>
            ) : ('No Messages')}
            

            {/* // <tr>
            //     <td><img src={Messageicon}/></td>
            //     <td><h3>System Mail</h3>
            //     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            //         Lorem Ipsum has<br/> been the industry's standard dummy text ever since the 1500s, <a className='details' href="#"> Details</a></p>
            //         <h6>2023-08-23 <span>09:35 pm</span></h6>
            //     </td>
                
            //     <td style={{textAlign: "right"}}>
            //         <a className='trash' href="#"><FontAwesomeIcon icon={faTrash} /></a>
            //         <br />
            //         <a className='viewnow' href="#">View Now <FontAwesomeIcon icon={faArrowRight}/></a>
            //     </td>
            // </tr>

            // <tr>
            //     <td><img src={Boxicon}/></td>
            //     <td><h3>System Mail</h3>
            //     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            //         Lorem Ipsum has<br/> been the industry's standard dummy text ever since the 1500s, <a className='details' href="#"> Details</a></p>
            //         <h6>2023-08-23 <span>09:35 pm</span></h6>
            //     </td>
                
            //     <td style={{textAlign: "right"}}>
            //         <a className='trash' href="#"><FontAwesomeIcon icon={faTrash} /></a>
            //         <br />
            //         <a className='viewnow' href="#">View Now <FontAwesomeIcon icon={faArrowRight}/></a>
            //     </td>
            // </tr>

            // <tr>
            //     <td><img src={Highvolumeicon}/></td>
            //     <td><h3>System Mail</h3>
            //     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            //         Lorem Ipsum has<br/> been the industry's standard dummy text ever since the 1500s,<a className='details' href="#"> Details</a></p>
            //         <h6>2023-08-23 <span>09:35 pm</span></h6>
            //     </td>
                
            //     <td style={{textAlign: "right"}}>
            //         <a className='trash' href="#"><FontAwesomeIcon icon={faTrash} /></a>
            //         <br />
            //         <a className='viewnow' href="#">View Now <FontAwesomeIcon icon={faArrowRight}/></a>
            //     </td>
            // </tr> */}

        </table>
    </div>
    </>
  )
}

export default Readmessage