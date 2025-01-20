import "./App.css";
import { windDirection } from "./utils/utils";
import React, { useState, useEffect } from "react";

import useCityData from "./hooks/useCityData";
import useCitySelection from "./hooks/useCitySelection";

import SearchBar from "./components/SearchBar";
import ForecastSection from "./components/ForecastSection";
import CityList from "./components/CityList";
import useCurrentWeather from "./hooks/useCurrentWeather";
import CurrentWeather from "./components/CurrentWeather";
import CurrentDayInfo from "./components/CurrentDayInfo";
import useTemperatureUnit from "./hooks/useTemperatureUnit";

import useCityFilter from "./hooks/useCityFilter";
import useLocationData from "./hooks/useLocationData";
import useForecastData from "./hooks/useForecastData";

function App() {
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState("");
  const { fetchTemperature } = useTemperatureUnit(cityName, setTemperature);

  const [temperatureUnit] = useState("C");
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

  useEffect(() => {
    fetchLocationData(setCityName, setTemperature);
  }, [fetchLocationData]);



  return (
    <div className="app">
      <div className="search-container">
        <SearchBar
          searchedCity={searchedCity}
          filterCityList={(e) => filterCityList(e.target.value)}
          fetchLocationData={fetchLocationData}
          setCityName={setCityName} // Passing setCityName
          setTemperature={setTemperature} // Passing setTemperature
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
        windDirection={windDirection}
        clickHandler1={() => fetchTemperature("C")}
        clickHandler2={() => fetchTemperature("F")}
      />
    </div>
  );
}

export default App;
