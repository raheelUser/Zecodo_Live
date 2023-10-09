import React from 'react'
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Shoppingtabs from './../../components/ShoppingOrderTabs/Shoppingtabs'

const AllShoppingOrders = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}

    <section id='allshoppingorders'>
        <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "30px 40px"}}
                >
                <div className='row'>
                    <div className='col-7'>
                        <h2>My Orders</h2>
                    </div>
                    <div className='col-5'>
                    <div className="search-bar">
					<input placeholder="Search It By Product ID / Order ID / Name ..."/>
					<button className="search"><FontAwesomeIcon icon={faSearch} /></button>
					</div>
                    </div>
                    <Shoppingtabs />
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

export default AllShoppingOrders