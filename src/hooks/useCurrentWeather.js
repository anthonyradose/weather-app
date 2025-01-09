import { useState, useEffect } from "react";
import { fetchCityWeather } from "../services/weatherService";
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
    const getCurrentWeather = async () => {
      if (!cityName) return;

      try {
        const data = await fetchCityWeather(cityName);
        setWeatherCondition(data.current.condition.text);
        const localTime = data.location.localtime.slice(0, 10);
        setTime(formatDate(localTime));

        const iconPath = data.current.is_day === 1 
          ? `day/${data.current.condition.icon.slice(39, 42)}`
          : `night/${data.current.condition.icon.slice(41, 44)}`;
        setWeatherIcon(`http://cdn.weatherapi.com/weather/128x128/${iconPath}.png`);

        setWindSpeed(data.current.wind_mph);
        setHumidity(data.current.humidity);
        setVisibility(data.current.vis_miles);
        setAirPressure(data.current.pressure_mb);
        setDirection(data.current.wind_dir);
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    };

    getCurrentWeather();
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
