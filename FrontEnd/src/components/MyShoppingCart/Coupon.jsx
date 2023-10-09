import React, {
  useState,
  useEffect
} from 'react'

const Coupon = () => {
  const [coupon, setCoupon] = useState({});
  const [usr_coupon, setUserCoupon] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    let usr_coupon = localStorage.getItem("user_coupon");
    setCoupon({
      ...coupon,
      [name]: value,
    });
  };
  const handle_submit = (e) =>{
    localStorage.setItem('user_coupon', coupon.coupon)
  }
  useEffect(() => {
    if(usr_coupon){
      setUserCoupon(usr_coupon)
    }
  }, []);
  return (
    <>
    <div className='coupon-input'>
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#Coupon" aria-expanded="true" aria-controls="collapseOne">
      Use Coupons  
      </button>
    </h2>
    <div id="Coupon" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className='coupon-input-field'>
        <form onSubmit={handle_submit} >
            <input 
             type='text'
             placeholder='Enter Coupon code'
             name="coupon"
             value={coupon.coupon}
             onChange={handleChange}
              />
            <button type='submit'>Apply</button>
        </form>
      </div>
    </div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default Coupon