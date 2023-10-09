import React from 'react'
import Userdashboardmenu from '../../components/Usermenus'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Wallethistory from '../../components/Wallet/wallethistory'
import Transactions from '../../components/Wallet/Transaction'
const MyWallet = () => {
  return (
    <>
    {/* HEADER */}
    <Header />
    {/* HEADER */}
    <section id='mywallet'>
            <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'
                style={{padding: "40px 40px"}}
                >
                <h2>My Wallet</h2>
                <div className='row price-first-wallet'>
                    <div className='col-9'>
                        <div className='price-wallet'>
                        <h1>$ 4,599.00</h1>
                        <p>Wallet balance available</p>
                        </div>
                    </div>
                    <div className='col-3 align-self-center'>
                        <div className='buttons'>
                            <a href="#"><button style={{backgroundColor: "#F9B300"}}>Recharge Wallet</button></a><br />
                            <a href="#"><button style={{backgroundColor: "#ABABAB"}}>Withdraw</button></a>
                        </div>
                    </div>
                </div>
                {/* WALLET HISTORIES */}

                <header class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_wallet1" data-bs-toggle="tab" class="nav-link active">Wallet history</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_wallet2" data-bs-toggle="tab" class="nav-link">Transactions</a>
                    </li>
                    </ul>
                    </header>

                <div class="tab-content">
                    <article id="tab_wallet1" class="tab-pane show active card-body">
                  <Wallethistory />
                    </article> 
                    <article id="tab_wallet2" class="tab-pane card-body">
                   <Transactions />
                    </article>
                    </div>

                    {/* WALLET HISTORIES END */}
                </div>
            </div>
    </section>
    {/* FOOTER */}
    <Footer />
     {/* FOOTER */}
    </>
  )
}

export default MyWallet