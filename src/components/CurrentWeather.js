import React from 'react';

function CurrentWeather({ weatherIcon, temperature, weatherCondition }) {
  return (
    <div className="weather-info">
      <div className="weather-icon-container">
        <img className="weather-icon" src={weatherIcon} alt="Weather Icon" />
      </div>
      <div className="temperature-display">
        <h1 className="temperature-text">{temperature}</h1>
      </div>
      <div className="condition-display">
        <h3 className="condition-text">{weatherCondition}</h3>
      </div>
    </div>
  );
}

export default CurrentWeather;
