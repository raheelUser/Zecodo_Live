import React from 'react'
import Categories from './Categories'
import Series from './Series'
import Brand from './Brand'
import Stores from './Stores'
const Maincategories = () => {
  return (
   <>
   <div className='container'>
   <section id='main-categories-list'
   style={{padding: "50px 0px 0px 0px"}}
   >
    <h2>Running Shoes</h2>
    <section class="tabs-products">
                <div class="container">
                <div class="row">
                  
              
                <div class="card">
                    <header class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_categories" data-bs-toggle="tab" class="nav-link active">Categories</a>
                    </li>
                    <li class="nav-item"><a href="#" data-bs-target="#tab_series" data-bs-toggle="tab" class="nav-link">Series
                    </a></li>
                    <li class="nav-item"><a href="#" data-bs-target="#tab_brand" data-bs-toggle="tab" class="nav-link">Brand
                    </a></li>
                    <li class="nav-item"><a href="#" data-bs-target="#tab_stores" data-bs-toggle="tab" class="nav-link">Stores
                    </a></li>
                    </ul>
                    </header>
                    <div class="tab-content">

                    <article id="tab_categories" class="tab-pane show active card-body">
                        <Categories />
                    </article> 

                    <article id="tab_series" class="tab-pane card-body">
                    <Series />
                    </article>

                    <article id="tab_brand" class="tab-pane card-body">
                    <Brand />
                    </article>

                    <article id="tab_stores" class="tab-pane card-body">
                    <Stores />
                    </article>

                  
                    </div>
                </div>
              
                    
                    
                </div>
                
                <br/><br/>
                
                </div>
                </section>
    </section>
    </div>
   </>
  )
}

export default Maincategories