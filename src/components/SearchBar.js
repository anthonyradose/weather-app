import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchedCity, filterCityList, fetchLocationData, setCityName, setTemperature }) {
  const handleLocationClick = () => {
    fetchLocationData(setCityName, setTemperature);
  };

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
        onClick={handleLocationClick} 
      />
    </div>
  );
}

export default SearchBar;
