import React, {
  useEffect,
  useState,
} from 'react'
import Mastercard1 from "../../Images/userimages/mypayments/1.png";
import Mastercard2 from "../../Images/userimages/mypayments/2.png";
import Mastercard3 from "../../Images/userimages/mypayments/3.png";
import Mastercard4 from "../../Images/userimages/mypayments/4.png";
import Mastercard5 from "../../Images/userimages/mypayments/5.jpg";
import Mastercard6 from "../../Images/userimages/mypayments/6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { BASE_API } from '../../services/Constant';
const Paymentsfield = () => {
  const instance = axios.create();
  let token = localStorage.getItem("token");
  let loggedInUser = localStorage.getItem("user");
  const [payments, setPayments] = useState({});
  const getPayments = () =>{
    axios.defaults.headers = {
      Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.get(`${BASE_API}/userpayments/self`)
        .then(res => {
        console.log('userpayments',res.data)
        setPayments(res.data)
        // getPayments();
    })
    .catch(error => {
        console.log("ERROR:: ", error);
    });
  }
  const deleteCard = (e, id) =>{
    e.preventDefault();
    axios.defaults.headers = {
      Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.delete(`${BASE_API}/userpayments/destroy/${id}`)
        .then(res => {
        alert(res.data)
        // getPayments();
    })
    .catch(error => {
        console.log("ERROR:: ", error);
    });
  }
  useEffect(() => {
    getPayments();
  }, []);
  return (
    <>
      <div className="my-paymentsfield">
        {
          payments.length > 0 ? (
            <>
            {payments.map(payment => (
           
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                checked={payment.set_default}
              />
              <label class="form-check-label" for="Method1">
              {
                (() => {
                      if(payment.card_type==='Master Card') {
                            return (
                              <img src={Mastercard1} />
                            )
                        } else if (payment.card_type==='Visa') {
                            return (
                              <img src={Mastercard3} />
                            )
                        } else  if (payment.card_type ==='Poineer') {
                          return (
                            <img src={Mastercard6} />
                          )
                        }else  if (payment.card_type ==='Discover') {
                          return (
                            <img src={Mastercard5} />
                          )
                        }else  if (payment.card_type ==='Pay Pal') {
                          return (
                            <img src={Mastercard4} />
                          )
                        }
                })()  
            }  
                
                <div className="labels">
                  <h4>
                  {payment.card_number} <br /> 
                  {
                (() => {
                      if(payment.card_type==='Master Card') {
                            return (
                              <span>MasterCard</span>
                            )
                        } else if (payment.card_type==='Visa') {
                            return (
                              <span>Visa</span>
                            )
                        } else  if (payment.card_type ==='Poineer') {
                          return (
                            <span>Poineer</span>
                          )
                        }else  if (payment.card_type ==='Discover') {
                          return (
                            <span>Discover</span>
                          )
                        }else  if (payment.card_type ==='Pay Pal') {
                          return (
                            <span>Pay Pal</span>
                          )
                        }
                })()  
            }
                  
                  </h4>
                </div>
                <div className="trash">
                  <a href="#" onClick={(e) => deleteCard(e, payment.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </label>
            </div>
            ))}
             </>
          ):('No Payments Records')
        }
        

        {/* Second Payment Method */}
        {/* <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="Method2"
          />
          <label class="form-check-label" for="Method2">
            <img src={Mastercard2} />
            <div className="labels">
              <h4>
                **** **** **** 9803 <br /> <span>MasterCard</span>
              </h4>
            </div>
            <div className="trash">
              <a href="#">
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </label>
        </div> */}

        {/* Third Payment Method */}
        {/* Second Payment Method */}
        {/* <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="Method3"
          />
          <label class="form-check-label" for="Method3">
            <img src={Mastercard3} />
            <div className="labels">
              <h4>
                **** **** **** 9803 <br /> <span>MasterCard</span>
              </h4>
            </div>
            <div className="trash">
              <a href="#">
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </label>
        </div> */}
      </div>
    </>
  );
};

export default Paymentsfield;
