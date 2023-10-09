import React from "react";

const Pricefilter = () => {
  return (
   <>
 <div class="range-filter">


 <input id="myRange" 
               min="0" 
               max="50" 
               step="10" 
               type="range" 
               class="form-range" />
            {/* <div class="range-controls">
                <div class="scale"><div 
                style={{marginleft: "50px", width:"100px" }}
                class="bar"></div></div>
                <div class="toggle min-toggle"></div>
                <div class="toggle max-toggle"></div>
            </div>  */}
          
            <div class="price-controls">
                 <input class="min-price" type="text" value="5 000" />
                 <p>-</p>
                 <input class="max-price" type="text" value="15 000" />
            </div> 
        </div>
        <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
  <label class="form-check-label" for="flexRadioDefault1">
  Up to $40
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
  <label class="form-check-label" for="flexRadioDefault2">
  $26 - $40
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked />
  <label class="form-check-label" for="flexRadioDefault3">
  At least $45 
  </label>
</div>

        
   </>
  )
}

export default Pricefilter