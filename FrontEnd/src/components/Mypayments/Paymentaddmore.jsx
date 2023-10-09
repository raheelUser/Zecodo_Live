import React, {
  useState,
} from 'react'
import axios from 'axios'
import Mastercard1 from "../../Images/userimages/mypayments/1.png";
import Mastercard2 from "../../Images/userimages/mypayments/2.png";
import Mastercard3 from "../../Images/userimages/mypayments/3.png";
import Mastercard4 from "../../Images/userimages/mypayments/4.png";
import Mastercard5 from "../../Images/userimages/mypayments/5.jpg";
import Mastercard6 from "../../Images/userimages/mypayments/6.jpg";
import Paymentcarddetails from '../Mypayments/Paymentcarddetails'
import { BASE_API } from '../../services/Constant';

const Paymentaddmore = () => {
  const instance = axios.create();
  let token = localStorage.getItem("token");
  let loggedInUser = localStorage.getItem("user");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [ radio, setRadio ] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCardChange = (e) => {
    const { nodeName, value } = e.target;
      if (nodeName === 'INPUT') {
        setRadio(value);
      }
  };
  const handleisDefault = (e) => {
    formData.set_default = true
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.card_type = radio
    // formData.card_type = radio
    if (loggedInUser) {
    // Perform validation here (e.g., check for empty fields)
    const newErrors = {};
    if (!formData.card_type) {
      newErrors.card_type = 'Please Select Card Type';
    }
    if (!formData.card_number) {
      newErrors.card_number = 'Please Write Card Number';
    }
    if (!formData.expiry_date) {
      newErrors.expiry_date = 'Please Select Expiry Date';
    }
    if (!formData.security_code) {
      newErrors.security_code = 'Security Code is Required';
    }
    formData.set_default = formData.set_default?formData.set_default:false;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      
      axios.defaults.headers = {
        Authorization: 'Bearer ' + JSON.parse(token)
      }
      axios.post(`${BASE_API}/userpayments/add`, formData)
          .then(res => {
         alert(res.data)
         formData.card_type=false
         formData.card_number=""
         formData.expiry_date=""
         formData.security_code=""
         formData.set_default=false
          // setResponce(res)
      })
      .catch(error => {
          console.log("ERROR:: ", error);
      });
    }
  }else{
    window.location.replace('/signin');
}
  };

  return (
   <>
  
<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
Add More
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Card Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <div className='payments-fields-methods'>
       <form onSubmit={handleSubmit}>
       <div onChange={handleCardChange}>
        
        {/* Payment1 */}
          <input
            class="form-check-input"
            type="radio"
            name="card_type"
            value="Master Card"
            onChange={handleCardChange}
          />
          <label class="form-check-label" for="PaymentMethod1">
            <img src={Mastercard1} />
          </label>
        </div>
        {/* Payment2 */}
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="card_type"
            value="American Express"
            onChange={handleCardChange}
          />
          <label class="form-check-label" for="PaymentMethod2">
            <img src={Mastercard2} />
          </label>
        </div>
        {/* Payment3 */}
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="card_type"
            value="Visa"
            onChange={handleCardChange}
          />
          <label class="form-check-label" for="PaymentMethod3">
            <img src={Mastercard3} />
          </label>
        </div>
      {/* Payment4 */}
      <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="card_type"
                  value="Pay Pal"
                  onChange={handleCardChange}
                />
                <label class="form-check-label" for="PaymentMethod4">
                  <img src={Mastercard4} />
                </label>
                </div>
                {/* Payment5 */}
                <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="card_type"
                            value="Discover"
                            onChange={handleCardChange}
                          />
                          <label class="form-check-label" for="PaymentMethod5">
                            <img src={Mastercard5} />
                          </label>
                        </div>
                {/* Payment6 */}
                <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="card_type"
                            value="Poineer"
                            onChange={handleCardChange}
                          />
                          <label class="form-check-label" for="PaymentMethod6">
                            <img src={Mastercard6} />
                          </label>
                        </div>
   
          {errors.card_type && <p className="error">{errors.card_type}</p>}
        <div className='card-details-payments'>
            <input 
              type="text" 
              onChange={handleChange}
              name="card_number"
              placeholder='Card Number'
              value={formData.card_number || ''}  
              />
              {errors.card_number && <p className="error">{errors.card_number}</p>}
              <input 
                type="date" 
                onChange={handleChange}
                name="expiry_date"
                placeholder='Expiry Date'
                value={formData.expiry_date || ''} 
              />
              {errors.expiry_date && <p className="error">{errors.expiry_date}</p>}
              <input 
                type="text" 
                onChange={handleChange}
                placeholder='Security Code'
                name="security_code"
                minLength={4}
                value={formData.security_code || ''} 
              />
              {errors.security_code && <p className="error">{errors.security_code}</p>}
    </div>
    <div className='button-carddetails'>
    <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="set_default"
            onChange={handleisDefault}
          />
          <label class="form-check-label" for="Default">
            <p>Set as default</p>
          </label>
        </div>
        <div className='savebutton-card'>
            <button type="submit">Save</button>
        </div>
    </div>
       </form>

{/* Payment6 */}

       </div>
       
      {/* <Paymentcarddetails /> */}
      
      </div>
      
    </div>
  </div>
</div>
   </>
  )
}

export default Paymentaddmore