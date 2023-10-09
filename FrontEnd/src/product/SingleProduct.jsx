import React, {
  useEffect,
  useState,
  Routes,
  Route
} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Singleproductinner from '../components/Singleproductinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'



const SingleProduct = () => {
  
    const goBack = (e) =>{
      e.preventDefault();
      window.history.back();
    }

  return (
    <>
    {/* Header Include */}
			<Header />
	{/* Header Include */}
  
    <div className='singleproduct'>
      <div className='container'>
      <div className='row'>
        <div className='back-button'>
          <a href="#"  onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} /> Back</a>
        </div>
        </div>   
        </div>
        
      <Singleproductinner/>
    </div>
    
    {/* Footer Include */}
			<Footer />
	{/* Footer Include */}

    </>
  )
}

export default SingleProduct