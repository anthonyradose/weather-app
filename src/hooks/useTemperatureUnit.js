import { fetchTemperatureCelsius, fetchTemperatureFahrenheit } from "../services/temperatureService";

const useTemperatureUnit = (cityName, setTemperature) => {
  const fetchTemperature = async (unit) => {
    try {
      const temperature =
        unit === "C"
          ? await fetchTemperatureCelsius(cityName)
          : await fetchTemperatureFahrenheit(cityName);

      setTemperature(temperature);
    } catch (error) {
      console.error(`Error fetching temperature in ${unit}:`, error);
    }
  };

  return { fetchTemperature };
};

export default useTemperatureUnit;
