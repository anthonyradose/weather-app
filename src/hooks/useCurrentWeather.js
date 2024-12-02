import { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../utils/utils";

const useCurrentWeather = (cityName) => {
  const [weatherCondition, setWeatherCondition] = useState("");
  const [time, setTime] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [airPressure, setAirPressure] = useState("");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      if (!cityName) return;

      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&aqi=no`
      );

      setWeatherCondition(res.data.current.condition.text);
      const localTime = res.data.location.localtime.slice(0, 10);
      const today = formatDate(localTime);
      setTime(today);

      res.data.current.is_day === 1
        ? setWeatherIcon(
            `http://cdn.weatherapi.com/weather/128x128/day/${res.data.current.condition.icon.slice(
              39,
              42
            )}.png`
          )
        : setWeatherIcon(
            `http://cdn.weatherapi.com/weather/128x128/night/${res.data.current.condition.icon.slice(
              41,
              44
            )}.png`
          );

      setWindSpeed(res.data.current.wind_mph);
      setHumidity(res.data.current.humidity);
      setVisibility(res.data.current.vis_miles);
      setAirPressure(res.data.current.pressure_mb);
      setDirection(res.data.current.wind_dir);
    };

    fetchCurrentWeather();
  }, [cityName]);

  return {
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
  };
};

export default useCurrentWeather;