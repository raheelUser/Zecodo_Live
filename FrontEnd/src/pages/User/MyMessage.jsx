import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Userdashboardmenu from '../../components/Usermenus'
import Allmessage from '../../components/Chatbox/Allmessage'
const MyMessage = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}
    <section id='mymessage'>
            <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "0px 40px"}}
                >
               <Allmessage />
                </div>
            </div>
    </section>
    {/* FOOTER */}
    <Footer />
     {/* FOOTER */}
    </>
  )
}

export default MyMessage