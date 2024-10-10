import axios from "axios";
import { formatDate } from "../utils/utils";

export const getCities = async () => {
  const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
  const countriesArr = res.data.data;
  const citiesArr = countriesArr.map((Arr) => Arr.cities);
  return citiesArr.flat();
};

export const getData = async () => {
  const res = await axios.get("https://geolocation-db.com/json/");
  const res2 = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${res.data.IPv4}&aqi=yes`
  );
  return {
    city: res.data.city || res2.data.location.region,
    temp: `${res2.data.current.temp_c}  \u00B0C`,
    condition: res2.data.current.condition.text,
    time: formatDate(res2.data.location.localtime.slice(0, 10)),
    icon: res2.data.current.is_day
      ? `http://cdn.weatherapi.com/weather/128x128/day/${res2.data.current.condition.icon.slice(
          39,
          42
        )}.png`
      : `http://cdn.weatherapi.com/weather/128x128/night/${res2.data.current.condition.icon.slice(
          41,
          44
        )}.png`,
  };
};

export const getCurr = async (city) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${city}&aqi=no`
  );
  return {
    condition: res.data.current.condition.text,
    time: formatDate(res.data.location.localtime.slice(0, 10)),
    icon: res.data.current.is_day
      ? `http://cdn.weatherapi.com/weather/128x128/day/${res.data.current.condition.icon.slice(
          39,
          42
        )}.png`
      : `http://cdn.weatherapi.com/weather/128x128/night/${res.data.current.condition.icon.slice(
          41,
          44
        )}.png`,
    wind: res.data.current.wind_mph,
    humidity: res.data.current.humidity,
    visibility: res.data.current.vis_miles,
    air: res.data.current.pressure_mb,
    direction: res.data.current.wind_dir,
  };
};

export const getFut = async (city, time, temp) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=e5a89a85ae524d618b391623223006&q=${city}&days=5&aqi=no&alerts=no`
  );
  const forecastArr = res.data.forecast.forecastday;
  return forecastArr.map((day) => {
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
};