import React from "react";
import ForecastCard from "./ForecastCard";
import UnitToggle from "./UnitToggle";
import WeatherHighlights from "./WeatherHighlights";

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
      <UnitToggle
        onCelsiusClick={clickHandler1}
        onFahrenheitClick={clickHandler2}
      />
      <div className="forecast-container">
        {forecastDays.map((day, index) => (
          <ForecastCard
            key={index}
            day={day}
            temperatureUnit={temperatureUnit}
          />
        ))}
      </div>
      <WeatherHighlights
        windSpeed={windSpeed}
        humidity={humidity}
        visibility={visibility}
        airPressure={airPressure}
        direction={direction}
        windDirection={windDirection}
      />
    </div>
  );
};

export default ForecastSection;
