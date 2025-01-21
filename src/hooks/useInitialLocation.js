import { useEffect } from "react";

const useInitialLocation = (fetchLocationData, setCityName, setTemperature) => {
  useEffect(() => {
    fetchLocationData(setCityName, setTemperature);
  }, [fetchLocationData, setCityName, setTemperature]);
};

export default useInitialLocation;
