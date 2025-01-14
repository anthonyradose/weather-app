import { useState, useEffect } from "react";
import { fetchCities } from "../services/citiesService";

const useCityData = () => {
  const [allCities, setAllCities] = useState("");

  useEffect(() => {
    const getCities = async () => {
      try {
        const citiesAll = await fetchCities();
        setAllCities(citiesAll);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    getCities();
  }, []);

  return allCities;
};

export default useCityData;
