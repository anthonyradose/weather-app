import { useCallback } from "react";
import { fetchCityWeather } from "../services/weatherService";
import { formatDate } from "../utils/utils";

const useCitySelection = (setCityName, setTemperature, setWeatherCondition, setTime) => {
  const handleCitySelection = useCallback(async (city) => {
    try {
      const data = await fetchCityWeather(city);
      setTemperature(`${data.current.temp_c} \u00B0C`);
      setWeatherCondition(data.current.condition.text);
      const localTime = data.location.localtime.slice(0, 10);
      setTime(formatDate(localTime));
      setCityName(data.location.name);
    } catch (error) {
      console.error("Error selecting city:", error);
    }
  }, [setCityName, setTemperature, setWeatherCondition, setTime]);

  return { handleCitySelection };
};

export default useCitySelection;
