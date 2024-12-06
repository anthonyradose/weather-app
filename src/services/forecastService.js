import axios from "axios";
import { formatDate } from "../utils/utils";

export const fetchForecastData = async (cityName, temperatureUnit) => {
  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=e5a89a85ae524d618b391623223006&q=${cityName}&days=5&aqi=no&alerts=no`
    );

    const forecastArr = res.data.forecast.forecastday;

    return forecastArr.map((day) => {
      const forecastDate = day.date;
      const dateStr = formatDate(forecastDate);

      return {
        date: dateStr,
        isToday: dateStr === formatDate(new Date()),
        icon: day.day.condition.icon,
        minTemp:
          temperatureUnit === "C"
            ? day.day.mintemp_c
            : day.day.mintemp_f,
        maxTemp:
          temperatureUnit === "C"
            ? day.day.maxtemp_c
            : day.day.maxtemp_f,
      };
    });
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
