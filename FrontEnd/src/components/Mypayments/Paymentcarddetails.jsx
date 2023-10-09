import React from 'react'

const Paymentcarddetails = () => {
  return (
    <>
    <div className='card-details-payments'>
    <input type="text" placeholder='Card Number' />
    <input type="text" placeholder='Expiry Date' />
    <input type="text" placeholder='Security Code' />
    </div>
    <div className='button-carddetails'>
    <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="Default"
          />
          <label class="form-check-label" for="Default">
            <p>Set as default</p>
          </label>
        </div>
        <div className='savebutton-card'>
            <a href="#"><button>Save</button></a>
        </div>
    </div>
    </>
  )
}

export default Paymentcarddetails