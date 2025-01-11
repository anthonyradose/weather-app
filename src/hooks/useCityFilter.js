import { useState } from "react";
import { filterCities } from "../utils/utils";

function useCityFilter(allCities) {
  const [searchedCity, setSearchedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState("");

  const filterCityList = (keyword) => {
    const results = filterCities(keyword, allCities);
    setFilteredCities(results);
    setSearchedCity(keyword);
  };

  const clearFilteredCities = () => {
    setFilteredCities("");
  };

  return {
    searchedCity,
    filteredCities,
    filterCityList,
    clearFilteredCities,
  };
}

export default useCityFilter;
