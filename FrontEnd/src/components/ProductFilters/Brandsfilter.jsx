import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Brandsfilter = () => {
  return (
    <>
    <div className='brand-filter-products'
    style={{padding: "20px 0px"}}
    >
    <h3>Brands</h3>
    <div className="search-bar">
        
                  <input placeholder="Find Filter" />
                  <button className="search">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
                <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter1" />
  <label class="form-check-label" for="BrandFilter1">
  Nike
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter2" checked />
  <label class="form-check-label" for="BrandFilter2">
  Addidas
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter3" checked />
  <label class="form-check-label" for="BrandFilter3">
  Reebok
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter4" checked />
  <label class="form-check-label" for="BrandFilter4">
  Woods
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter5" checked />
  <label class="form-check-label" for="BrandFilter5">
  Louis Vuitton
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="BrandFilter6" checked />
  <label class="form-check-label" for="BrandFilter6">
  Louis Vuitton
  </label>
</div>
    </div>
    </>
  )
}

export default Brandsfilter