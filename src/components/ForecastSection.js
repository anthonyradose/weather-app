import React from "react";
import ForecastCard from "./ForecastCard";
import PercentageBar from "./PercentageBar";

const ForecastSection = ({
  forecastDays,
  temperatureUnit,
  windSpeed,
  humidity,
  visibility,
  airPressure,
  direction,
  windDirection,
  clickHandler1,
  clickHandler2,
}) => {
  return (
    <div className="forecast-section">
      <div className="unit-toggle-container">
        <button onClick={clickHandler1} className="unit-toggle-button">
          °C
        </button>
        <button onClick={clickHandler2} className="unit-toggle-button">
          °F
        </button>
      </div>
      <div className="forecast-container">
        {forecastDays.map((day, index) => (
          <ForecastCard
            key={index}
            day={day}
            temperatureUnit={temperatureUnit}
          />
        ))}
      </div>

      <div className="weather-highlights">
        <div className="highlights-title-container">
          <h3 className="highlights-title">Today's Highlights</h3>
        </div>

        <div className="highlights-body">
          <div className="highlight-card">
            <div>
              <h4 className="highlight-title">Wind Status</h4>
              <p className="highlight-value">{windSpeed}mph</p>
              <div className="wind-compass">
                {windDirection(direction)}
                {direction}
              </div>
            </div>
          </div>
          <div className="highlight-card">
            <div>
              <h4 className="highlight-title">Humidity</h4>
              <p className="highlight-value">{humidity}%</p>
              <div className="humidity-bar">
                <PercentageBar bgcolor="yellow" completed={humidity} />
              </div>
            </div>
          </div>
          <div className="highlight-card">
            <div>
              <h4 className="highlight-title">Visibility</h4>
              <p className="highlight-value">{visibility}miles</p>
            </div>
          </div>
          <div className="highlight-card">
            <div>
              <h4 className="highlight-title">Air Pressure</h4>
              <p className="highlight-value">{airPressure}mb</p>
            </div>
          </div>
        </div>

        <div className="credits-section">
          <h4>Created by Anthony Radose</h4>
        </div>
      </div>
    </div>
  );
};

export default ForecastSection;
