import "./App.css";
import { formatDate, windDirection, filterCities } from "./utils/utils";
import React, { useState, useEffect } from "react";
import {
  fetchTemperatureCelsius,
  fetchTemperatureFahrenheit,
} from "./services/temperatureService";

import { fetchCities } from "./services/citiesService";
import { getLocationData } from "./services/locationService";
import { fetchForecastData } from "./services/forecastService";
import SearchBar from "./components/SearchBar";
import ForecastSection from "./components/ForecastSection";

import CityList from "./components/CityList";
import useCurrentWeather from "./hooks/useCurrentWeather";
import CurrentWeather from "./components/CurrentWeather";
import CurrentDayInfo from "./components/CurrentDayInfo";
import { fetchCityWeather } from "./services/weatherService";


function App() {
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [allCities, setAllCities] = useState("");
  const [forecastDays, setForecastDays] = useState([]);
  const [temperatureUnit] = useState("C");

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

  useEffect(() => {
    const getCities = async () => {
      const citiesAll = await fetchCities();
      setAllCities(citiesAll);
    };
    getCities();
  }, []);

  const [searchedCity, setSearchedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState("");

  const filterCityList = (e) => {
    const keyword = e.target.value;
    const results = filterCities(keyword, allCities);
    setFilteredCities(results);
    setSearchedCity(keyword);
  };

  const fetchLocationData = async () => {
    try {
      const locationData = await getLocationData();
      setCityName(locationData.cityName);
      setTemperature(locationData.temperature);
    } catch (error) {
      console.error("Error fetching location data", error);
    }
  };
  useEffect(() => {
    fetchLocationData();
  }, []);

  useEffect(() => {
    if (cityName) {
      const fetchForecast = async () => {
        try {
          const forecastData = await fetchForecastData(
            cityName,
            temperatureUnit
          );
          setForecastDays(forecastData);
        } catch (error) {
          console.error("Failed to fetch forecast:", error);
        }
      };
      fetchForecast();
    }
  }, [cityName, temperatureUnit]);

  const handleCitySelection = async (city) => {
    try {
      const res = await fetchCityWeather(city);
      setTemperature(`${res.current.temp_c} \u00B0C`);
      setWeatherCondition(res.current.condition.text);
      const localTime = res.location.localtime.slice(0, 10);
      const today = formatDate(localTime);
      setTime(today);
      setCityName(res.location.name);
    } catch (error) {
      console.error("Error fetching city data", error);
    }
  };

  const clickHandler1 = async () => {
    try {
      const temperature = await fetchTemperatureCelsius(cityName);
      setTemperature(temperature);
    } catch (error) {
      console.error("Error fetching temperature in Celsius:", error);
    }
  };
  
  const clickHandler2 = async () => {
    try {
      const temperature = await fetchTemperatureFahrenheit(cityName);
      setTemperature(temperature);
    } catch (error) {
      console.error("Error fetching temperature in Fahrenheit:", error);
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <SearchBar
          searchedCity={searchedCity}
          filterCityList={filterCityList}
          fetchLocationData={fetchLocationData}
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
            setFilteredCities([]);
            setSearchedCity(city);
          }}
          clearFilteredCities={() => setFilteredCities("")}
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
        clickHandler1={clickHandler1}
        clickHandler2={clickHandler2}
      />
    </div>
  );
}

export default App;
