import React from 'react'
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Myaddressandoffice from '../../components/Myaddressinner/Myaddressandoffice'
import Postaddress from '../../components/Myaddressinner/Postaddress'
const MyAddress = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}

    <section id='myaddress'>
        <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "30px 40px"}}
                >
                <h2>My Address</h2>
                   <Myaddressandoffice />
                   {/* <div className='button-address'>
                   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add New Address</button>
                   </div> */}
                   <Postaddress />
                </div>
            </div>
    </section>

    {/* FOOTER */}
    <Footer />
    {/* FOOTER */}
    </>
  )
}

export default MyAddress