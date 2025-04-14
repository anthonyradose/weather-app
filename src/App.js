import React, { useState } from "react";
import "./App.css";

// Utilities

import { renderWindDirectionIcon } from "./utils/utils";

// Hooks
import useCityData from "./hooks/useCityData";
import useCitySelection from "./hooks/useCitySelection";
import useCurrentWeather from "./hooks/useCurrentWeather";
import useTemperatureUnit from "./hooks/useTemperatureUnit";
import useInitialLocation from "./hooks/useInitialLocation";
import useCityFilter from "./hooks/useCityFilter";
import useLocationData from "./hooks/useLocationData";
import useForecastData from "./hooks/useForecastData";

// Components
import SearchBar from "./components/SearchBar";
import ForecastSection from "./components/ForecastSection";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import CurrentDayInfo from "./components/CurrentDayInfo";

const App = () => {
  // State
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("C");

  // Hooks
  const { fetchTemperature } = useTemperatureUnit(cityName, setTemperature);
  const { forecastDays } = useForecastData(cityName, temperatureUnit);
  const allCities = useCityData();
  const {
    weatherCondition,
    time,
    weatherIcon,
    windSpeed,
    humidity,
    visibility,
    airPressure,
    direction,
    setWeatherCondition,
    setTime,
  } = useCurrentWeather(cityName);
  const { searchedCity, filteredCities, filterCityList, clearFilteredCities } =
    useCityFilter(allCities);
  const { fetchLocationData } = useLocationData();
  const { handleCitySelection } = useCitySelection(
    setCityName,
    setTemperature,
    setWeatherCondition,
    setTime
  );
  const handleUnitChange = (unit) => {
    setTemperatureUnit(unit);
    fetchTemperature(unit);
  };

  // Initialize Location
  useInitialLocation(fetchLocationData, setCityName, setTemperature);
  console.log("filteredCities:", filteredCities);

  // Render
  return (
    <div className="app">
      <main className="content">
      <div className="search-container">
        <SearchBar
          searchedCity={searchedCity}
          filterCityList={(e) => filterCityList(e.target.value)}
          fetchLocationData={fetchLocationData}
          setCityName={setCityName}
          setTemperature={setTemperature}
        />
        <CurrentWeather
          weatherIcon={weatherIcon}
          temperature={temperature}
          weatherCondition={weatherCondition}
        />
        <CityList
          filteredCities={filteredCities}
          handleCityClick={(city) => {
            handleCitySelection(city);
            clearFilteredCities();
          }}
          clearFilteredCities={clearFilteredCities}
        />
        <CurrentDayInfo time={time} cityName={cityName} />
      </div>
      <ForecastSection
        forecastDays={forecastDays}
        temperatureUnit={temperatureUnit}
        windSpeed={windSpeed}
        humidity={humidity}
        visibility={visibility}
        airPressure={airPressure}
        direction={direction}
        windDirectionIcon={renderWindDirectionIcon}
        clickHandler1={() => handleUnitChange("C")}
        clickHandler2={() => handleUnitChange("F")}
      />
      </main>
      <footer className="footer">
        <p>Created by Anthony Radose</p>
        <p>Photo by <a rel="noopener noreferrer" target="_blank" href="https://unsplash.com/@omarvellous14?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Omar Ramadan</a> on <a rel="noopener noreferrer" target="_blank" href="https://unsplash.com/photos/green-grass-field-under-blue-sky-and-white-clouds-during-daytime-vcRHpfrsaL8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
