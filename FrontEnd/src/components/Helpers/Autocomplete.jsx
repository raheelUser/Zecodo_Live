import React, { useState, useEffect } from 'react';
// import Card from "react-bootstrap/Card";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import {BASE_API} from '../../services/Constant';
import axios from "axios";
// const BASE_API = "http://localhost:8000/api"

const Autocomplete = ({items}) => {
    const [searchTerm, updateSearchTerm] = useState('');
    const [filteredResults, updateFilteredResults] = useState([]);
    const [searchResults, updateSearchResults] = useState([]);
    const [displayResults, updateDisplayResults] = useState(false);
    const [focusIndex, updateFocusIndex] = useState(-1);
    const linkRefs = [];
    const keys = {
        ENTER: 13,
        UP: 38,
        DOWN: 40
    };
    const fetchProducts = () => {
        axios.get(`${BASE_API}/products`)
		.then(
			response => {
			  updateSearchResults(response.data.data);
			})
		.catch(error => {
				console.log("ERROR:: ",error);
			});
    }
    const getSearchResults = async () => {
        // ⚠️ This is where you should pull data in from your server
        // const searchResultsResponse = await getSearchResults();
        switch(items) {
            case 'products':
                fetchProducts();
            default:
              return null;
          }
    };
    useEffect(() => {
        getSearchResults();
    }, []);

    const updateSearch = e => {
        // console.log(e.target.value)
        // console.log(searchResults)
        updateSearchTerm(e.target.value);
        updateFilteredResults(searchResults.filter(result => result.name.match(new RegExp(e.target.value, 'gi'))))
    };

    const hideAutoSuggest = e => {
        e.persist();

        if (e.relatedTarget && e.relatedTarget.className === 'autosuggest-link') {
            return;
        }

        updateDisplayResults(true);
        updateFocusIndex(-1);
    };

    const showAutoSuggest = () => {
        updateDisplayResults(false);
    };

    const handleNavigation = e => {
        switch (e.keyCode) {
            case keys.ENTER:
                if (focusIndex !== -1)  {
                    window.open(linkRefs[focusIndex].href);
                }

                hideAutoSuggest(e);
            break;
            case keys.UP:

                if (focusIndex > -1) {
                    updateFocusIndex(focusIndex - 1);
                }
            break;
            case keys.DOWN:

                if (focusIndex < filteredResults.length - 1) {
                    updateFocusIndex(focusIndex + 1);
                }
            break;
        }
    };

    const SearchResults = () => {
        const Message = ({ text }) => (
            <div className="search-results-message">
                <h2>{text.name}</h2>
            </div>
        );

        if (!displayResults) {
            return null;
        }

        if (!searchResults.length) {
            return <Message text="Loading search results" />
        }

        if (!searchTerm) {
            // return <Message text="Try to search for something..." />
            return <Message text="" />
        }

        if (!filteredResults.length) {
            return <Message text="We couldn't find anything for your search term." />
        }

        return (
            <ul className="search-results">
                {filteredResults.map((article, index) => (
                    <li key={index}>
                        {/* ⚠️ You may want to outsource this part to make the component less heavy */}
                        {/* <Card model={article.name} /> */}
                        {article.name}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section className="search">
            {/* <h1>Search {searchTerm.length ? `results for: ${searchTerm}` : null}</h1> */}
            <input type="text"
                    placeholder="Search by product name/image/image URL"
                    onKeyUp={updateSearch}
                    onKeyDown={handleNavigation}
                    onBlur={hideAutoSuggest}
                    onFocus={showAutoSuggest} 
                    />
                    <button className="search"><FontAwesomeIcon icon={faSearch} /></button>
            <ul className="search-suggestions">
                {(!displayResults && searchTerm) && <li key="-1" className={focusIndex === -1 ? 'active' : null}>{`Search for ${searchTerm}`}</li>}
                {!displayResults && filteredResults.map((article, index) => (
                    <li key={index} className={focusIndex === index ? 'active' : null}>
                        <Link
                            to={{
                                pathname: `/productpage/${article.guid}`
                            }}
                            ref={link => {linkRefs[index] = link}}
                            className="autosuggest-link"
                            target="_blank"
                            >
                                {article.name}
                        </Link>
                        {/* <a href={article.link} target="_blank" className="autosuggest-link"
                            ref={link => {linkRefs[index] = link}}>
                            {article.name}
                        </a> */}
                    </li>
                ))}
            </ul>
            <SearchResults />
            <div>
                {/* {items?.map((product) => (
						<p>{product.name}</p>
                ))} */}
        {/* <h1>My name is {name}.</h1>
        <p>My favorite design tool is {tool}.</p> */}
      </div>
        </section>
    );
}

export default Autocomplete;