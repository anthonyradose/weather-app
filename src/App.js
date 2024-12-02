import "./App.css";
import { formatDate, windDirection } from "./utils/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import OutsideClickHandler from "react-outside-click-handler";
import PercentageBar from "./components/PercentageBar";
import useCurrentWeather from "./hooks/useCurrentWeather";

function App() {
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [allCities, setAllCities] = useState("");
  const [forecastDays, setForecastDays] = useState([]);

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

  // GET ALL THE CITIES OF THE WORLD:
  const fetchCities = async () => {
    const res = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    const countriesArr = res.data.data;
    const citiesArr = countriesArr.map((Arr) => Arr.cities);
    const citiesAll = citiesArr.flat();
    setAllCities(citiesAll);
  };
  useEffect(() => {
    fetchCities();
  }, []);

  const [searchedCity, setSearchedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState("");
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allCities.filter((city) => {
        return city.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredCities(results);
    } else {
      setFilteredCities("");
    }
    setSearchedCity(keyword);
  };

  // GET CURRENT LOCATION:
  const getLocationData = async (e) => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const res2 = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${res.data.IPv4}&aqi=yes`
    );
    setSearchedCity("");
    res.data.city === null
      ? setCityName(res2.data.location.region)
      : setCityName(res.data.city);

    setTemperature(`${res2.data.current.temp_c}  \u00B0C`);
  };
  useEffect(() => {
    getLocationData();
  }, []);

  // GET FUTURE FORECAST:
  const fetchForecastData = async () => {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&days=5&aqi=no&alerts=no`
    );

    const forecastArr = res.data.forecast.forecastday;

    const forecastMappd = forecastArr.map((day) => {
      const forecastDate = day.date;
      const dateStr = formatDate(forecastDate);

      return (
        <div className="forecast-card">
          <div>
            <span>{dateStr === time ? "Today" : dateStr}</span>
          </div>
          <div>
            <img
              alt="Weather Icon"
              className="forecast-icon"
              src={`http://cdn.weatherapi.com/weather/128x128/day/${day.day.condition.icon.slice(
                39,
                42
              )}.png`}
            ></img>
          </div>
          <div>
            <span className="forecast-temp min">
              {temperature.charAt(temperature.length - 1) === "C"
                ? `${day.day.mintemp_c} \u00B0C`
                : `${day.day.mintemp_f} \u2109`}
            </span>
            <span className="forecast-temp max">
              {temperature.charAt(temperature.length - 1) === "C"
                ? `${day.day.maxtemp_c} \u00B0C`
                : `${day.day.maxtemp_f} \u2109`}
            </span>
          </div>
        </div>
      );
    });
    return setForecastDays(forecastMappd);
  };
  useEffect(() => {
    fetchForecastData();
  });

  const handleClick = async (event) => {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${event}&aqi=no`
    );
    setTemperature(`${res.data.current.temp_c} \u00B0C`);
    setWeatherCondition(res.data.current.condition.text);
    const localTime = res.data.location.localtime.slice(0, 10);
    const today = formatDate(localTime);
    setTime(today);
    setCityName(res.data.location.name);
  };

  const clickHandler1 = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const res2 = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${res.data.IPv4}&aqi=no`
    );
    setTemperature(`${res2.data.current.temp_c}  \u00B0C`);
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
            onChange={filter}
            onClick={filter}
            className="search-input"
            placeholder="Search for cities"
          />
          <FontAwesomeIcon
            className="location-search-icon"
            icon={faLocationCrosshairs}
            onClick={getLocationData}
          />
        </div>

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
          {filteredCities && filteredCities.length > 0 ? (
            <OutsideClickHandler
              className="search-results"
              onOutsideClick={() => {
                setFilteredCities("");
              }}
            >
              <div className="city-list">
                {filteredCities.map((city) => (
                  <li
                    className="city-item"
                    onClick={() => {
                      handleClick(city);
                      setFilteredCities([]);
                      setSearchedCity(city);
                    }}
                  >
                    <span className="city-name">{city}</span>
                  </li>
                ))}
              </div>
            </OutsideClickHandler>
          ) : null}
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
        <div className="forecast-container">{forecastDays}</div>
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