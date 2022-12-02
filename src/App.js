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
  };
  useEffect(() => {
    getData();
  }, []);

  // GET CURRENT LOCATION INFO:
  const getCurr = async () => {
    const res =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${city}&aqi=no
    `);

    setTemp(res.data.current.temp_c);
    setCondition(res.data.current.condition.text);
    const tim = res.data.location.localtime.slice(0, 10);
    const today = formatDate(tim);
    setTime(today);
    // setIcon(res.data.current.condition.icon);
    setIcon(
      `http://cdn.weatherapi.com/weather/128x128/day/${res.data.current.condition.icon.slice(
        39,
        42
      )}.png`
    );
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
        <div className="five-day-weather">
          <div>
            <span>{dateStr === time ? "Today" : dateStr}</span>
          </div>
          <div>
            <img
              alt="JIMBO"
              className="jimbo"
              src={`http://cdn.weatherapi.com/weather/128x128/day/${day.day.condition.icon.slice(
                39,
                42
              )}.png`}
            ></img>
          </div>
          <div>
            <span className="jimbo-span">{day.day.mintemp_c}&#8451;</span>
            <span className="jimbo-span">{day.day.maxtemp_c}&#8451;</span>
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
    setTemp(res.data.current.temp_c);
    setCondition(res.data.current.condition.text);
    const tim = res.data.location.localtime.slice(0, 10);
    const str = tim;
    const date = new Date(str);
    const today = date.toString().slice(0, 10);
    setTime(today);
    setCity(res.data.location.name);
  };

  return (
    <div className="App">
      <div className="thirty">
        <div className="top-ten">
          <input
            type="search"
            id="site-search"
            name="q"
            value={name}
            onChange={filter}
            onClick={filter}
            className="fa"
            placeholder="Search for cities"
          />
          <FontAwesomeIcon
            className="crosshair"
            icon={faLocationCrosshairs}
            onClick={getData}
          />
        </div>

        <div className="middle-eighty">
          <div className="weather-img-div">
            <img className="weather-img" src={icon} alt="jimmy" />
          </div>
          <div className="weather-temp-div">
            <h1 className="weather-temp">{temp}&#8451;</h1>
          </div>
          <div className="weather-clim-div">
            <h3 className="weather-clim">{condition}</h3>
          </div>
          {foundUsers && foundUsers.length > 0 ? (
            <OutsideClickHandler
              className="JAMES"
              onOutsideClick={() => {
                setFoundUsers("");
              }}
            >
              <div className="user-list">
                {foundUsers.map((user) => (
                  <li
                    className="user"
                    onClick={() => {
                      handleClick(user);
                      setFoundUsers("");
                      setName(user);
                    }}
                  >
                    <span className="user-name">{user}</span>
                  </li>
                ))}
              </div>
            </OutsideClickHandler>
          ) : null}
        </div>
        <div className="bottom-ten">
          <div className="bottom-ten-span-div">
            <span className="day">Today</span>
            <span className="date">{time}</span>
          </div>
          <div className="location-div">
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <span className="location-span">{city}</span>
          </div>
        </div>
      </div>

      <div className="seventy">
        <div className="forty">
          <div className="seventy-top-twenty">
            <div className="temp-div">
              <span>Celsius</span> <span>Farenheit</span>
            </div>
          </div>
          <div className="seventy-eighty">{day}</div>
        </div>
        <div className="sixty">
          <div className="sixty-top-ten">
            <h3 className="today-h3">Today's Highlights</h3>
          </div>

          <div className="sixty-middle-seventy">
            <div className="today-div">
              <div>
                <h4 className="today-h4">Wind Status</h4>{" "}
                <p className="today-p">{wind}mph</p>
                <div className="today-wind">
                  {windDirection(direction)}
                  {direction}
                </div>
              </div>
            </div>
            <div className="today-div">
              <div>
                <h4 className="today-h4">Humidity</h4>{" "}
                <p className="today-p">{humidity}%</p>
                <div className="today-range">
                  <PercentageBar bgcolor="yellow" completed={humidity} />
                </div>
              </div>
            </div>
            <div className="today-div">
              <div>
                <h4 className="today-h4">Visibility</h4>{" "}
                <p className="today-p">{visibility}miles</p>
              </div>
            </div>
            <div className="today-div">
              <div>
                <h4 className="today-h4">Air Pressure</h4>{" "}
                <p className="today-p">{air}mb</p>
              </div>
            </div>
          </div>

          <div className="sixty-bottom-thirty">
            <h4>Created by Anthony Radose</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
