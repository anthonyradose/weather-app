import { useState, useEffect } from "react";
import { getData, getCurr, getFut } from "../services/api";

export const useWeather = (city) => {
  const [weather, setWeather] = useState({
    city: "",
    temp: "",
    condition: "",
    time: "",
    icon: "",
    wind: "",
    humidity: "",
    visibility: "",
    air: "",
    direction: "",
    forecast: [],
  });

  useEffect(() => {
    getData().then((data) => {
      setWeather((prev) => ({
        ...prev,
        city: data.city,
        temp: data.temp,
        condition: data.condition,
        time: data.time,
        icon: data.icon,
      }));
    });
  }, []);

  useEffect(() => {
    if (city) {
      getCurr(city).then((data) => {
        setWeather((prev) => ({
          ...prev,
          condition: data.condition,
          time: data.time,
          icon: data.icon,
          wind: data.wind,
          humidity: data.humidity,
          visibility: data.visibility,
          air: data.air,
          direction: data.direction,
        }));
      });
      getFut(city).then((forecast) => {
        setWeather((prev) => ({
          ...prev,
          forecast,
        }));
      });
    }
  }, [city]);

  return weather;
};