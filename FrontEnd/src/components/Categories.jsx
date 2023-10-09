import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import axios from 'axios'
import Categoryicon from '../Images/categoryicon.png';
const BASE_API = "http://localhost:8000/api"


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories =  async () => {
    axios.get(`${BASE_API}/categoryproduct/`)
        .then(data => {
        setCategories(data.data)
      }).catch((err) => {
        console.log('err',err)
    })
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <>
    <div className='product-categories-list'>
        <ul>
        {categories?.map(category => 
         {
          return category.products.length > 0 ?
          <li key={category.id} ><a href="#">{category.name}</a></li>
          :
          false
         } 
        )
      }
            {/* <li><a href="#">Footwear</a></li>
            <li><a href="#">Boots</a></li>
            <li><a href="#">Basketball Shoes</a></li>
            <li><a href="#">Shoes</a></li>
            <li><a href="#">Gym & Training Shoes</a></li>
            <li><a href="#">Running Shoes</a></li>
            <li><a href="#">Outdoor Slippers</a></li>
            <li><a href="#">Outdoor Joggers</a></li> */}
        </ul>
    </div>
    </>
  )
}

export default Categories