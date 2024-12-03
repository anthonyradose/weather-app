import axios from "axios";

export const fetchCities = async () => {
  const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
  const countriesArr = res.data.data;
  const citiesArr = countriesArr.map((Arr) => Arr.cities);
  return citiesArr.flat(); // Return the flattened array
};
