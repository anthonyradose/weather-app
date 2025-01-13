import axios from "axios";

export const getLocationData = async () => {
  try {
    const geoRes = await axios.get("https://geolocation-db.com/json/");
    console.log("Geo Location Response:", geoRes);

    const weatherRes = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${geoRes.data.IPv4}&aqi=yes`
    );
    console.log("Weather Response:", weatherRes);

    const cityName =
      geoRes.data.city || weatherRes.data.location.region || "Unknown Location";
    console.log("City Name:", cityName); // Check what city name is returned

    return {
      cityName,
      temperature: `${weatherRes.data.current.temp_c} \u00B0C`,
    };
  } catch (error) {
    console.error("Failed to fetch location data:", error);
    throw error; // Re-throw to propagate the error to the caller
  }
};
