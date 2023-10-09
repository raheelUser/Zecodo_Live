import React from 'react'

const Ratings = () => {
  return (
   <>
   <div className='ratings-filter-product'
   style={{padding: "30px 0px"}}
   >
    <h3>Ratings</h3>
   <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="ColorFilter1" />
  <label class="form-check-label" for="ColorFilter1">
  Top Rated
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="ColorFilter2" checked />
  <label class="form-check-label" for="ColorFilter2">
  4.5
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="ColorFilter3" checked />
  <label class="form-check-label" for="ColorFilter3">
  4.0
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="ColorFilter4" checked />
  <label class="form-check-label" for="ColorFilter4">
  3.9
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="ColorFilter5" checked />
  <label class="form-check-label" for="ColorFilter5">
  3.4
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="ColorFilter6" checked />
  <label class="form-check-label" for="ColorFilter6">
  3.2
  </label>
</div>
   </div>
   </>
  )
}

export default Ratings