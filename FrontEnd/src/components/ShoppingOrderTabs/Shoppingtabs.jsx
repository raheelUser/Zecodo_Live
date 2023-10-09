import React from 'react'
import PaymentPending from './PaymentPending'
import Warehousepending from './Warehousepending'
import Warehouseorders from './Warehouseorders'
import Internationalshippingfeeorder from './Internationalshippingfeepending'
import Internationalshippingorder from './Internationalshippingorder'
import Returnorders from './Returnorders'
import Deliveredorders from './Delieveredorders'
import Backpayment from './ConfirmandBackpayment/Backpayment'
import ConfirmPayment from './ConfirmandBackpayment/ConfirmPayment'
const Shoppingtabs = () => {
  return (
   <>
   <header class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab1" data-bs-toggle="tab" class="nav-link active">All Shopping Orders</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab2" data-bs-toggle="tab" class="nav-link">Payment Pending</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab3" data-bs-toggle="tab" class="nav-link">warehouse pending</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab4" data-bs-toggle="tab" class="nav-link">in warehouse Orders</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab5" data-bs-toggle="tab" class="nav-link">international shipping fee pending</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab6" data-bs-toggle="tab" class="nav-link">Pay Back</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab7" data-bs-toggle="tab" class="nav-link">Pay Confirm</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab8" data-bs-toggle="tab" class="nav-link">international shipping Order</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab9" data-bs-toggle="tab" class="nav-link">delivered Orders</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#Shopping-tab10" data-bs-toggle="tab" class="nav-link">return Orders</a>
                    </li>
                    </ul>
    </header>

    <div class="tab-content">
                    <article id="Shopping-tab1" class="tab-pane show active card-body">
                      <div className='allorders'>
                        <div className='pending'>
                          <h3 className='main-headings'>Payments Pending</h3>
                          <PaymentPending />
                        </div>

                        <div className='warepending'
                        style={{padding: "20px 0px"}}>
                          <h3 className='main-headings'>Warehouse Pending</h3>
                          <Warehousepending />
                        </div>

                        <div className='wareorder'
                        style={{padding: "20px 0px"}}>
                          <h3 className='main-headings'>Warehouse Orders</h3>
                          <Warehouseorders />
                        </div>

                        <div className='returnsorder'
                        style={{padding: "20px 0px"}}>
                          <h3 className='main-headings'>Return Orders</h3>
                          <Returnorders />
                        </div>
                      </div>
                    </article> 
                    <article id="Shopping-tab2" class="tab-pane card-body">
                   <PaymentPending />
                    </article>

                    <article id="Shopping-tab3" class="tab-pane card-body">
                    <Warehousepending />
                    </article>
                    <article id="Shopping-tab4" class="tab-pane card-body">
                    <Warehouseorders />
                    </article>
                    <article id="Shopping-tab5" class="tab-pane card-body">
                    <Internationalshippingfeeorder />
                    </article>
                    <article id="Shopping-tab6" class="tab-pane card-body">
                    <Backpayment />
                    </article>
                    
                    <article id="Shopping-tab7" class="tab-pane card-body">
                    <ConfirmPayment />
                    </article>
                    <article id="Shopping-tab8" class="tab-pane card-body">
                    <Internationalshippingorder />
                    </article>
                    <article id="Shopping-tab9" class="tab-pane card-body">
                    <Deliveredorders />
                    </article>
                    <article id="Shopping-tab10" class="tab-pane card-body">
                    <Returnorders />
                    </article>
     </div>
   </>
  )
}

export default Shoppingtabs