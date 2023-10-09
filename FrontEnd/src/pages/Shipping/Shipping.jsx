import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Shippingbanners from '../../components/Shipping/Shippingbanners'
import Shippingcalculator from '../../components/Shipping/Shippingcalculator'
import Typesofdelivery from '../../components/Shipping/Typesofdelivery'
const Shippingdetails = () => {
  return (
    <>
    {/* Header Include */}
			<Header />
			{/* Header Include */}

      <section id='shipingbanner'>
        <Shippingbanners />
        <Shippingcalculator />
        <Typesofdelivery />
      </section>
      {/* Footer Include */}
			<Footer />
			{/* Footer Include */}
    </>
  )
}

export default Shippingdetails