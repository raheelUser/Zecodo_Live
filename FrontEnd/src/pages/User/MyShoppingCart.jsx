import React from 'react'
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Ordertotal from '../../components/MyShoppingCart/Ordertotal'
import Cartproducts from '../../components/MyShoppingCart/Cartproducts'
import Coupon from '../../components/MyShoppingCart/Coupon'
const MyShoppingCart = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}

    <section id='myshoppingcart'>
        <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "30px 40px"}}
                >
               <h2>My Shopping Cart</h2>
                   <div className='row'>
                    <div className='col-8'>
                        <Cartproducts />
                        <Coupon />
                    </div>
                    <div className='col-4'>
                        <Ordertotal />
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

export default MyShoppingCart