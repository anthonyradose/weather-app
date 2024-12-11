import "./App.css";
import { formatDate, windDirection, filterCities } from "./utils/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchCities } from "./services/citiesService";
import { getLocationData } from "./services/locationService";
import { fetchForecastData } from "./services/forecastService";
import ForecastCard from "./components/ForecastCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import CityList from "./components/CityList";
import PercentageBar from "./components/PercentageBar";
import useCurrentWeather from "./hooks/useCurrentWeather";

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
    console.log(res)
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
            onClick={fetchLocationData}
          />
        </div>

        <div className="weather-info">
          <div className="weather-icon-container">
            <img
              className="weather-icon"
              src={weatherIcon}
              alt="Weather Icon"
            />
          </div>
          <div className="temperature-display">
            <h1 className="temperature-text">{temperature}</h1>
          </div>
          <div className="condition-display">
            <h3 className="condition-text">{weatherCondition}</h3>
          </div>
          <CityList
  filteredCities={filteredCities}
  handleCityClick={(city) => {
    handleCitySelection(city);
    setFilteredCities([]);
    setSearchedCity(city);
  }}
  clearFilteredCities={() => setFilteredCities("")}
/>
        </div>
        <div className="current-day-info">
          <div className="day-date">
            <span className="day-name">Today</span>
            <span className="date">{time}</span>
          </div>
          <div className="location-info">
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <span className="location-name">{cityName}</span>
          </div>
        </div>
      </div>

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
  <ForecastCard key={index} day={day} temperatureUnit={temperatureUnit} />
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
    </div>
  );
}

export default App;
