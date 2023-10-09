import React from 'react'
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Edituserdetails from '../../components/Mysetting/Edituserdetails'
const MySetting = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}

    <section id='mysetting'>
        <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "30px 40px"}}
                >
                <h2>Settings</h2>
                   <Edituserdetails />
                </div>
            </div>
    </section>

    {/* FOOTER */}
    <Footer />
    {/* FOOTER */}
    </>
  )
}

export default MySetting