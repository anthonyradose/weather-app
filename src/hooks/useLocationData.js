import { useState, useCallback } from "react";
import { getLocationData } from "../services/locationService";

const useLocationData = () => {
  const [locationError, setLocationError] = useState(null);

  const fetchLocationData = useCallback(async (setCityName, setTemperature) => {
    try {
      const locationData = await getLocationData();
      setCityName(locationData.cityName);
      setTemperature(locationData.temperature);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLocationError(error);
    }
  }, [])

  return { fetchLocationData, locationError };
};

export default useLocationData;
