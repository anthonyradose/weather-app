import { useState, useEffect } from "react";
import { fetchForecastData } from "../services/forecastService";

const useForecastData = (cityName, temperatureUnit) => {
  const [forecastDays, setForecastDays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cityName) {
      const fetchForecast = async () => {
        try {
          const forecastData = await fetchForecastData(cityName, temperatureUnit);
          setForecastDays(forecastData);
        } catch (error) {
          setError("Failed to fetch forecast");
          console.error("Failed to fetch forecast:", error);
        }
      };
      fetchForecast();
    }
  }, [cityName, temperatureUnit]);

  return { forecastDays, error };
};

export default useForecastData;
