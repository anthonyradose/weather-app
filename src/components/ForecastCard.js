// components/ForecastCard.js
import React from 'react';

const ForecastCard = ({ day, temperatureUnit }) => (
  <div className="forecast-card">
    <div>
      <span>{day.isToday ? "Today" : day.date}</span>
    </div>
    <div>
      <img
        alt="Weather Icon"
        className="forecast-icon"
        src={`http://cdn.weatherapi.com/weather/128x128/day/${day.icon.slice(
          39,
          42
        )}.png`}
      />
    </div>
    <div>
      <span className="forecast-temp min">{`${day.minTemp}°${temperatureUnit}`}</span>
      <span className="forecast-temp max">{`${day.maxTemp}°${temperatureUnit}`}</span>
    </div>
  </div>
);

export default ForecastCard;
