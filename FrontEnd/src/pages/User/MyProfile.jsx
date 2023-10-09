import React, { useEffect, useState } from "react"
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProfileAvatar from '../../Images/userimages/myprofile/profileavatar.png'
import axios from 'axios'
import { BASE_API } from '../../services/Constant';

const MyProfile = () => {
  const instance = axios.create();
    const [responce,setResponce] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  let token = localStorage.getItem("token");

    const fetchUserData = () => {
        var localUser = localStorage.getItem('user'); 
        var loggedInUser = JSON.parse(localUser); 
        setFormData(loggedInUser)
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            'submited', formData
        )
        // return
      // You can submit the form or perform further actions here
      axios.defaults.headers = {
        Authorization: 'Bearer ' + JSON.parse(token)
      }
       axios.post(`${BASE_API}/user/update`, formData)
            .then(res => {
                // console.log('res', res)
            setResponce(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
        })
    }
    useEffect(() => {
    fetchUserData()
    }, [])
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}
    <section id='myprofile'>
            <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'>
                    <div className='personalinfo'>
                        <h2>Personal Info</h2>
                        <div className='myprofile fields'>
                        <div className='profile-customfields'>
                            <div className='profile-picture'>
                            <div className="circle">
                                <img className="profile-pic" src={ProfileAvatar} />
                                </div>
                                <div className="p-image">
                                    <p>Change Profile Photo</p>
                                    <input className="file-upload" type="file" accept="image/*" placeholder='Change Profile Photo' />
                            </div>
                            </div>
                        </div>
                        <div className='forms-input-fields'>
                        <form onSubmit={handleSubmit}>
                            <div className='names-fields d-flex'>
                                <input
                                    placeholder='First Name :'
                                    className="m-2 text-center form-control rounded"
                                    type="text"
                                    name="fname"
                                    value={formData?.fname}
                                    onChange={handleChange}
                                    />
                                <input
                                    placeholder='Last Name :'
                                    className="m-2 text-center form-control rounded"
                                    type="text"
                                    name="lname"
                                    value={formData?.lname}
                                    onChange={handleChange}
                                    />
                            </div>
                            <input
                                    placeholder='Mobile :'
                                    className="m-2 text-center form-control rounded"
                                    type="number"
                                    name="mobile"
                                    value={formData?.mobile}
                                    onChange={handleChange}
                                    />
                                <select name="job_description" value={formData.job_description} onChange={handleChange} >
                                    <option value="" selected>Job Description</option>
                                    <option value="director">Director</option>
                                    <option value="ceo">CTO</option>
                                    <option value="staff">Staff</option>
                                </select>
                                <input
                                    placeholder='Email :'
                                    className="m-2 text-center form-control rounded"
                                    type="email"
                                    name="email"
                                    value={formData?.email}
                                    onChange={handleChange}
                                    />
                                <input
                                    placeholder='Additional Email Address :'
                                    className="m-2 text-center form-control rounded"
                                    type="email"
                                    name="additional_email"
                                    value={formData?.additional_email}
                                    onChange={handleChange}
                                    />
                                    
                            {/* <input className="m-2 text-center form-control rounded" type="email" id="first5" placeholder='Additional Email Address' value={user?.} /> */}
                            <button type="submit">Update</button>
                        </form>
                </div>
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

export default MyProfile