import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import axios from 'axios'
import Categoryicon from '../Images/categoryicon.png';
const BASE_API = "http://localhost:8000/api"
// import { BASE_API } from '../services/Constant';
const Categoriesmenus = () => {
  const instance = axios.create();
  const [categories, setCategories] = useState([]);
  const fetchCategoryData =  async () => {
    axios.get(`${BASE_API}/categories/`, {cors: true})
        .then(data => {
        setCategories(data.data)
      }).catch((err) => {
        console.log('err',err)
    })
  }
  useEffect(() => {
    fetchCategoryData()
  }, [])
  return (
    <>
    <div className='categories-list'>
     <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <img src={Categoryicon}/>Categories
  </button>
  <ul class="dropdown-menu dropdown-menu-dark">
  {categories?.map(category => (
        category.children_recursive.length > 0 ?
        <li key={category.id} class="dropend"><a href="#" class="dropdown-item active dropdown-toggle">{category.name}</a>
          <ul class="dropdown-menu shadow">
          {category.children_recursive.map(child => (
            <li key={child.id}>
              <Link class="dropdown-item" to={{pathname: `/productpage/${child.guid}`}}>{child.name}</Link>
            </li>
              // <a class="dropdown-item" href="/productpage/{child.id}">  </a> 
            ))}
          </ul>
        </li>
        :
        <li key={category.id} class="dropend"><a href="/productpage" class="active dropdown-item">{category.name}</a></li>
        ))
      }
    {/* <li class="dropend"><a class="dropdown-item active dropdown-toggle" href="#">Electronic</a>
    <ul class="dropdown-menu shadow">
                  <li><a class="dropdown-item" href=""> Ovens </a></li>
                  <li><a class="dropdown-item" href=""> Hair Trimmer</a></li>
                  <li><a class="dropdown-item" href=""> Computer</a></li>
                  <li><a class="dropdown-item" href=""> Drones</a></li>
                  <li><a class="dropdown-item" href=""> Printer</a></li>
                  <li><a class="dropdown-item" href=""> cartridges</a></li>
                  <li><a class="dropdown-item" href=""> extractor</a></li>
                  <li><a class="dropdown-item" href=""> hoods</a></li>
                  <li><a class="dropdown-item" href=""> electric Cars</a></li>
                  <li><a class="dropdown-item" href=""> power tools</a></li>

                </ul>
    </li>
    <li><a href="" class="dropdown-item">Sports & Outdoors</a></li>
    <li><a class="dropdown-item" href="#">Home Life</a></li>
    <li><a class="dropdown-item" href="#">Men</a></li>
    <li><a class="dropdown-item" href="#">Women</a></li>
    <li><a class="dropdown-item" href="#">Fashion & Acceessories</a></li>
    <li><a class="dropdown-item" href="#">Drugstore & Health</a></li>
    <li><a class="dropdown-item" href="#">Women</a></li>
    <li><a class="dropdown-item" href="#">Fashion & Acceessories</a></li>
    <li><a class="dropdown-item" href="#">Drugstore & Health</a></li> */}
  </ul>
</div> 
    </div>
    </>
  )
}

export default Categoriesmenus