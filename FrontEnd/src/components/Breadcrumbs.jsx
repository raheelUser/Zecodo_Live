import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
const Breadcrumbs = () => {
  return (
    <div class="breadcrumbs">
      <div class="container">
        <ul class="breadcrumbs__list">
        <li><a href="/"><FontAwesomeIcon icon={faHome} /> </a></li>
          <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> Women</a></li>
          <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> Clothing & Accessories</a></li>
          <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> Running Shoe</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumbs