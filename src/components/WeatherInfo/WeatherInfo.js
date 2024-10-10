import React, { useState, useEffect } from "react";
import { getData, getCurr } from "../../services/api";
import "./WeatherInfo.css";

function WeatherInfo() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [time, setTime] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    getData().then((data) => {
      setCity(data.city);
      setTemp(data.temp);
      setCondition(data.condition);
      setTime(data.time);
      setIcon(data.icon);
    });
  }, []);

  useEffect(() => {
    if (city) {
      getCurr(city).then((data) => {
        setCondition(data.condition);
        setTime(data.time);
        setIcon(data.icon);
      });
    }
  }, [city]);

  return (
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
      <div className="current-day-info">
        <div className="day-date">
          <span className="day-name">Today</span>
          <span className="date">{time}</span>
        </div>
        <div className="location-info">
          <span className="location-name">{city}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;