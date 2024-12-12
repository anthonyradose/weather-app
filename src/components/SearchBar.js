import React from "react"; // Import React for functional components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon


function SearchBar({ searchedCity, filterCityList, fetchLocationData }) {
    return (
      <div className="search-input-container">
        <input
          type="search"
          id="site-search"
          name="q"
          value={searchedCity}
          onChange={filterCityList}
          onClick={filterCityList}
          className="search-input"
          placeholder="Search for cities"
        />
        <FontAwesomeIcon
          className="location-search-icon"
          icon={faLocationCrosshairs}
          onClick={fetchLocationData}
        />
      </div>
    );
  }
  export default SearchBar;
  