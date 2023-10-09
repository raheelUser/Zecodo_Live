import React from "react"
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WishlistCard from '../../components/Wishlistproducts'

const MyWishlist = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}
    <section id='mywishlist'>
            <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'>
                <WishlistCard />
                </div>
            </div>
    </section>
    {/* FOOTER */}
    <Footer />
     {/* FOOTER */}
    </>
  )
}

export default MyWishlist