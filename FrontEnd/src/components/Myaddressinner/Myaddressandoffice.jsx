import React, {
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { BASE_API } from '../../services/Constant';


const Myaddressandoffice = () => {
  const instance = axios.create();
  let token = localStorage.getItem("token");
  let loggedInUser = localStorage.getItem("user");
  const [self, setSelf] = useState({});

  const getAddress = () => {
    axios.defaults.headers = {
      Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.get(`${BASE_API}/user/address/self`)
        .then(
            response => {
              console.log('address',response.data)
              setSelf(response.data);
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
  };
  const deleteAddress = (e,id) => {
    e.preventDefault();
    axios.defaults.headers = {
      Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.get(`${BASE_API}/user/address/delete/${id}`)
        .then(
            response => {
              alert(response)
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
  }
  const handleRadioChange =(e,id) =>{
    axios.defaults.headers = {
      Authorization: 'Bearer ' + JSON.parse(token)
    }
    axios.get(`${BASE_API}/user/address/update/${id}`)
        .then(
            response => {
              alert(response.data)
            })
        .catch(error => {
            console.log("ERROR:: ", error);
        });
  }
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
   <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Selected Address
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <iframe 
      style={{width:"100%", height: "400px"}}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27136292.463542726!2d82.8135601136813!3d33.875854737249945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31508e64e5c642c1%3A0x951daa7c349f366f!2sChina!5e0!3m2!1sen!2s!4v1694732613232!5m2!1sen!2s" ></iframe>
      <table className='address-table'>
        <thead>
          <th>
            Street Location
          </th>
          <th>
            City
          </th>
          <th>
            Default
          </th>
          <th>
            Action
          </th>
        </thead>
      {
            self.length >0
            ?(
                <>
                {self.map(sel =>{
                    return (
                      <>
                      <tr>
                        <td>{sel.address}</td>
                        <td>{sel.city}</td>
                        <td><input type="radio" onChange={(e) => handleRadioChange(e,sel.id)} checked={sel.isDefault}/></td>
                        <td><a href="#" onClick={(e) => deleteAddress(e,sel.id)}>Delete</a></td>
                    </tr>
                      </>
                    )
                })}
               </>
            )
               :('')
            }
      
        {/* <tr>
            <td>Street Location</td>
            <td>14500 Juanita Drive NEKenmore WA 98028-4966USA</td>
        </tr>
        <tr>
            <td>City</td>
            <td>Kenmore</td>
        </tr>
        <tr>
            <td>Label</td>
            <td>Home</td>
        </tr> */}
      </table>
    </div>
    </div>
  </div>
  {/* <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Office Address
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <table className='address-table'>
        <tr>
            <td>Street Location</td>
            <td>14500 Juanita Drive NEKenmore WA 98028-4966USA</td>
        </tr>
        <tr>
            <td>City</td>
            <td>Kenmore</td>
        </tr>
        <tr>
            <td>Label</td>
            <td>Home</td>
        </tr>
      </table>
       </div>
    </div>
  </div> */}

</div>
    </>
  )
}

export default Myaddressandoffice