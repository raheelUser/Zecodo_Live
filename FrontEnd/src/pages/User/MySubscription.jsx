import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Userdashboardmenu from '../../components/Usermenus'
import Giftimage from '../../Images/userimages/mysubscription/gift.png'
import Cecimage from '../../Images/userimages/mysubscription/cec.png'
import Discount1 from '../../Images/userimages/mysubscription/discount1.png'
import Discount2 from '../../Images/userimages/mysubscription/discount2.png'
import Discount3 from '../../Images/userimages/mysubscription/discount3.png'

const MySubscription = () => {
  return (
    <>
   

        {/* HEADER */}
        <Header />
        {/* HEADER */}
        <section id='mysubscription'>
            <div className='row'>
                <div className='col-2'>
                    <Userdashboardmenu />
                </div>

                <div className='col-10'>
                    <div className='main-subscription'
                    style={{padding: "30px 30px"}}
                    >
                {/* FIRST ROW */}
                <div className='row vouchersubscription'
                style={{padding: "20px 0px"}}
                >
                        <h2>
                        My Subscription
                        </h2>
                        <div className='col-4'>
                            <div className='box-subscription'>
                                <h1>25 </h1>
                                <h6>My Vouchers</h6>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='box-subscription'>
                                <h1>25 </h1>
                                <h6>Discount Subscriptions</h6>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='box-subscription'>
                                <h1>25 </h1>
                                <h6>Unsubscribed</h6>
                            </div>
                        </div>
                    
                </div>
                {/* FIRST ROW END */}


                {/* Second ROw start */}
                <div className='row gift'>
                    <div className='col-6'>
                        <img src={Giftimage} width="100%" />
                    </div>
                    <div className='col-6 align-self-center'>
                        <div className='gift-text'>
                            <h2>Discount Deals? Get Gifts</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and<br /> typesetting industry. 
                            Lorem Ipsum has been the industry's<br /> standard dummy text ever since 
                            the 1500s, Details</p>
                            <a href="#"><button>Join us</button></a>
                        </div>
                    </div>
                </div>
                {/* Second row end */}

                {/* THIRD ROW START */}
                <div className='discountsubscrp'
                style={{padding:"40px 0px"}}
                >
                    <h2>Discount Subscriptions</h2>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='discount-box'>
                            <img src={Cecimage} width="auto"/>
                            <h4>2023-08-23</h4>
                            <h3>Discount Deal</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, DetailsLorem Ipsum 
                                is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been
                            </p>
                            <div className='price-subscribe-button'>
                                <h6>$ 45.00</h6>
                                <a href="#"><button>Subscribe</button></a>
                            </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='discount-box'>
                            <img src={Cecimage} width="auto"/>
                            <h4>2023-08-23</h4>
                            <h3>Discount Deal</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, DetailsLorem Ipsum 
                                is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been
                            </p>
                            <div className='price-subscribe-button'>
                                <h6>$ 45.00</h6>
                                <a href="#"><button>Subscribe</button></a>
                            </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='discount-box'>
                            <img src={Cecimage} width="auto"/>
                            <h4>2023-08-23</h4>
                            <h3>Discount Deal</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, DetailsLorem Ipsum 
                                is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been
                            </p>
                            <div className='price-subscribe-button'>
                                <h6>$ 45.00</h6>
                                <a href="#"><button>Subscribe</button></a>
                            </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='discount-box'>
                            <img src={Cecimage} width="auto"/>
                            <h4>2023-08-23</h4>
                            <h3>Discount Deal</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, DetailsLorem Ipsum 
                                is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been
                            </p>
                            <div className='price-subscribe-button'>
                                <h6>$ 45.00</h6>
                                <a href="#"><button>Subscribe</button></a>
                            </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='discount-box'>
                            <img src={Cecimage} width="auto"/>
                            <h4>2023-08-23</h4>
                            <h3>Discount Deal</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, DetailsLorem Ipsum 
                                is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been
                            </p>
                            <div className='price-subscribe-button'>
                                <h6>$ 45.00</h6>
                                <a href="#"><button>Subscribe</button></a>
                            </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='discount-box'>
                            <img src={Cecimage} width="auto"/>
                            <h4>2023-08-23</h4>
                            <h3>Discount Deal</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, DetailsLorem Ipsum 
                                is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been
                            </p>
                            <div className='price-subscribe-button'>
                                <h6>$ 45.00</h6>
                                <a href="#"><button>Subscribe</button></a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* THIRD ROW END */}

                {/* FOURTH ROW START */}
                <div className='coupons'>
                    <h2>One Time Coupons</h2>
                    <div className='row'
                    style={{padding: "20px 0px"}}
                    >
                        <div className='col-4'>
                            <img src={Discount1} width="100%" />
                            <a href="#"><button>Get it now</button></a>
                        </div>
                        <div className='col-4'>
                            <img src={Discount2} width="100%" />
                            <a href="#"><button>Get it now</button></a>
                        </div>
                        <div className='col-4'>
                            <img src={Discount3} width="100%" />
                            <a href="#"><button>Get it now</button></a>
                        </div>
                    </div>
                </div>
                {/* FOURTH ROW END */}
                </div>
                </div>
            </div>
    </section>
        {/* Footer */}
        <Footer />
        {/* Footer */}

   
    </>
  )
}

export default MySubscription