// services/weatherService.js
import axios from "axios";

const API_KEY = "e5a89a85ae524d618b391623223006"; // Move to .env

export const fetchCityWeather = async (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
  const response = await axios.get(url);
  return response.data;
};
