import React from 'react'

const Paywithstripe = () => {
  return (
   <>
   <div className='paywithstripe'>
    <h5>Credit or Debit card</h5>
    <p>Your payements are secured, Your Details are confedentials</p>
    <input type="Card Number" placeholder='Card Number' />
    <div className='expire-code'>
    <input type="Expiration Date" placeholder='Expiration Date' />
    <input type="Security Code" placeholder='Security Code' /> 
    </div>
    <div className='expire-code'>
    <input type="First Name" placeholder='First Name' />
    <input type="Last Name" placeholder='Last Name' /> 
    </div>
   </div>
   <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter1" />
  <label class="form-check-label" for="BrandFilter1">
  Remember this card for the future
  </label>
</div>
   </>
  )
}

export default Paywithstripe