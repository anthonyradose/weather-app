import axios from "axios";

export const fetchTemperatureCelsius = async (cityName) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&aqi=no`
  );
  return `${response.data.current.temp_c} \u00B0C`;
};

export const fetchTemperatureFahrenheit = async (cityName) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&aqi=no`
  );
  return `${response.data.current.temp_f} \u2109`;
};
