// components/CityList.js
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

const CityList = ({ filteredCities, handleCityClick, clearFilteredCities }) => {
  if (!filteredCities || filteredCities.length === 0) return null;

  return (
    
    <OutsideClickHandler onOutsideClick={clearFilteredCities}>
      <div className="city-list">
        {filteredCities.map((city) => (
          <li
            className="city-item"
            onClick={() => handleCityClick(city)}
            onChange={() => handleCityClick(city)}
            key={city.id}
          >
            <span className="city-name">{city}</span>
          </li>
        ))}
      </div>
    </OutsideClickHandler>
  );
};

export default CityList;
