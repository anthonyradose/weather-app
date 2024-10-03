import "./App.css";
import { formatDate, windDirection } from "./utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import OutsideClickHandler from "react-outside-click-handler";
import PercentageBar from "./PercentageBar";

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [time, setTime] = useState("");
  const [foundCities, setFoundCities] = useState("");
  const [icon, setIcon] = useState("");
  const [day, setDay] = useState([]);
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [air, setAir] = useState("");
  const [direction, setDirection] = useState("");

  // GET ALL THE CITIES OF THE WORLD:
  const getCities = async () => {
    const res = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    const countriesArr = res.data.data;
    const citiesArr = countriesArr.map((Arr) => Arr.cities);
    const citiesAll = citiesArr.flat();
    setFoundCities(citiesAll);
  };
  useEffect(() => {
    getCities();
  }, []);
  const [name, setName] = useState("");
  // the search result
  const [foundUsers, setFoundUsers] = useState("");
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = foundCities.filter((user) => {
        return user.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers("");
    }
    setName(keyword);
  };

  // GET CURRENT LOCATION:
  const getData = async (e) => {
    const res = await axios.get("https://geolocation-db.com/json/");

    const res2 =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${res.data.IPv4}&aqi=yes
    `);
    setName("");
    res.data.city === null
      ? setCity(res2.data.location.region)
      : setCity(res.data.city);

    setTemp(`${res2.data.current.temp_c}  \u00B0C`);
  };
  useEffect(() => {
    getData();
  }, []);

  // GET CURRENT LOCATION INFO:
  const getCurr = async () => {
    const res =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${city}&aqi=no
    `);

    setCondition(res.data.current.condition.text);
    const tim = res.data.location.localtime.slice(0, 10);

    const today = formatDate(tim);
    setTime(today);

    // Whether to show day condition icon or night icon
    //     is_day:	1 = Yes, 0 = No

    res.data.current.is_day === 1
      ? setIcon(
          `http://cdn.weatherapi.com/weather/128x128/day/${res.data.current.condition.icon.slice(
            39,
            42
          )}.png`
        )
      : setIcon(
          `http://cdn.weatherapi.com/weather/128x128/night/${res.data.current.condition.icon.slice(
            41,
            44
          )}.png`
        );

    // setIcon(res.data.current.condition.icon)
    setWind(res.data.current.wind_mph);
    setHumidity(res.data.current.humidity);
    setVisibility(res.data.current.vis_miles);
    setAir(res.data.current.pressure_mb);
    setDirection(res.data.current.wind_dir);
  };
  useEffect(() => {
    if (city !== "" && city !== " " && city !== null && city !== undefined)
      getCurr();
  });

  // GET FUTURE FORECAST:
  const getFut = async () => {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=e5a89a85ae524d618b391623223006&q=${city}&days=5&aqi=no&alerts=no`
    );

    const forecastArr = res.data.forecast.forecastday;

    const forecastObj = forecastArr.map((day) => {
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
            <span className="forecase-temp min">
              {temp.charAt(temp.length - 1) === "C"
                ? `${day.day.mintemp_c} \u00B0C`
                : `${day.day.mintemp_f} \u2109`}
            </span>
            <span className="forecast-temp max">
              {temp.charAt(temp.length - 1) === "C"
                ? `${day.day.maxtemp_c} \u00B0C`
                : `${day.day.maxtemp_f} \u2109`}
            </span>
          </div>
        </div>
      );
    });

    return setDay(forecastObj);
  };
  useEffect(() => {
    getFut();
  });

  const handleClick = async (event) => {
    const res =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${event}&aqi=no
`);
    setTemp(`${res.data.current.temp_c} \u00B0C`);

    setCondition(res.data.current.condition.text);
    const tim = res.data.location.localtime.slice(0, 10);
    const today = formatDate(tim);
    setTime(today);
    setCity(res.data.location.name);
  };

  const clickHandler1 = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const res2 =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${res.data.IPv4}&aqi=no
`);


    setTemp(`${res2.data.current.temp_c}  \u00B0C`);
  };
  const clickHandler2 = async () => {
    const res =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${city}&aqi=no
`);
    setTemp(`${res.data.current.temp_f}  \u2109`);
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="search"
            id="site-search"
            name="q"
            value={name}
            onChange={filter}
            onClick={filter}
            className="search-input"
            placeholder="Search for cities"
          />
          <FontAwesomeIcon
            className="search-icon"
            icon={faLocationCrosshairs}
            onClick={getData}
          />
        </div>

        <div className="weather-info">
          <div className="weather-icon-container">
            <img className="weather-icon" src={icon} alt="Weather Icon" />
          </div>
          <div className="weather-temperature">
            <h1 className="temperature-text">{temp}</h1>
          </div>
          <div className="weather-condition">
            <h3 className="condition-text">{condition}</h3>
          </div>
          {foundUsers && foundUsers.length > 0 ? (
            <OutsideClickHandler
              className="search-results"
              onOutsideClick={() => {
                setFoundUsers("");
              }}
            >
              <div className="city-list">
                {foundUsers.map((user) => (
                  <li
                    className="city-item"
                    onClick={() => {
                      handleClick(user);
                      setFoundUsers([]);
                      setName(user);
                    }}
                  >
                    <span className="city-name">{user}</span>
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
            <span className="location-name">{city}</span>
          </div>
        </div>
      </div>

      <div className="forecast-container">
        <div className="unit-toggle">
              <button onClick={clickHandler1} className="unit-button">°C</button>
              <button onClick={clickHandler2} className="unit-button">°F</button>
        </div>
        <div className="forecast-list">{day}</div>
        <div className="highlights-container">
          <div className="highlights-header">
            <h3 className="highlights-title">Today's Highlights</h3>
          </div>

          <div className="highlights-body">
            <div className="highlight-card">
              <div>
                <h4 className="highlight-title">Wind Status</h4>
                <p className="highlight-value">{wind}mph</p>
                <div className="wind-direction">
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
                <p className="highlight-valuee">{visibility}miles</p>
              </div>
            </div>
            <div className="highlight-card">
              <div>
                <h4 className="highlight-title">Air Pressure</h4>
                <p className="highlight-value">{air}mb</p>
              </div>
            </div>
          </div>

          <div className="highlights-footer">
            <h4>Created by Anthony Radose</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
