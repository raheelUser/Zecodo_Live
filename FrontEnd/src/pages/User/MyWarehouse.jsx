import React from 'react'
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Warehouseorders from '../../components/ShoppingOrderTabs/Warehouseorders'

const MyWarehouse = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}

    <section id='mywarehouse'>
        <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "30px 40px"}}
                >
               <h2>My WareHouse</h2>
                <Warehouseorders />
                </div>
            </div>
    </section>

    {/* FOOTER */}
    <Footer />
    {/* FOOTER */}
    </>
  )
}

export default MyWarehouse