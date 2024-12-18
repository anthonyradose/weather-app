import "./App.css";
import { formatDate, windDirection, filterCities } from "./utils/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchCities } from "./services/citiesService";
import { getLocationData } from "./services/locationService";
import { fetchForecastData } from "./services/forecastService";
import SearchBar from "./components/SearchBar";
import ForecastSection from "./components/ForecastSection";

import CityList from "./components/CityList";
import useCurrentWeather from "./hooks/useCurrentWeather";
import CurrentWeather from "./components/CurrentWeather";
import CurrentDayInfo from "./components/CurrentDayInfo";

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
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${city}&aqi=no`
      );
      setTemperature(`${res.data.current.temp_c} \u00B0C`);
      setWeatherCondition(res.data.current.condition.text);
      const localTime = res.data.location.localtime.slice(0, 10);
      const today = formatDate(localTime);
      setTime(today);
      setCityName(res.data.location.name);
    } catch (error) {
      console.error("Error fetching city data", error);
    }
  };

  const clickHandler1 = async () => {
    // const res = await axios.get("https://geolocation-db.com/json/");
    // const res2 = await axios.get(
    //   `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${res.data.IPv4}&aqi=no`
    // );
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&aqi=no`
    );
    setTemperature(`${res.data.current.temp_c}  \u00B0C`);
    console.log(res);
  };

  const clickHandler2 = async () => {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&aqi=no`
    );
    setTemperature(`${res.data.current.temp_f}  \u2109`);
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
