import React, {
  useEffect,
  useState,
  Routes,
  Route
} from 'react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import Maincategories from "../../components/Maincategories";
import AllProducts from "../Featured/Allproducts";
import Categories from "../../components/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Brandsfilter from '../../components/ProductFilters/Brandsfilter'
import Pricefilter from '../../components/ProductFilters/Pricefilter'
import Colorfilter from '../../components/ProductFilters/Colorfilter'
import Ratings from '../../components/ProductFilters/Ratings'

const FeturedProductPage = () => {
 
  return (
    <>
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      <section id="product-page">
        <Breadcrumbs />
        <Maincategories />
        <div className="container">
          <div className="row">

            <div className="col-3">
              <div className="filters">
                <h2>Filters</h2>
                <div
                  className="categorieslist-filters"
                  style={{ padding: "20px 0px" }}
                >
                  <h3>Footwear</h3>
                  <Categories />
                </div>
                <div className="search-bar">
                  <input placeholder="Find Filter" />
                  <button className="search">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
                <div className="price-filers"
                style={{padding: "30px 0px 0px 0px"}}
                >
                    <h3>Price</h3>
                    <Pricefilter />
                </div>
                <Brandsfilter />
                <Colorfilter />
                <Ratings />
              </div>
            </div>
            {/* COL 3 END */}
            <div className="col-9">
              <AllProducts  />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
      {/* FOOTER */}
    </>
  );
};

export default FeturedProductPage;
