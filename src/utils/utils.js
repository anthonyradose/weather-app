import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

// Format a date string into "Weekday, Day Month" format
export const formatDate = (str) => {
  const date = new Date(str);
  const options = { weekday: "long", day: "numeric", month: "long" };
  return date.toLocaleDateString(undefined, options);
};

// Get the rotation angle for a given wind direction
export const windDirectionAngles = {
  N: -45,
  NNE: -22.5,
  NE: 0,
  ENE: 22.5,
  E: 45,
  ESE: 67.5,
  SE: 90,
  SSE: 112.5,
  S: 135,
  SSW: 157.5,
  SW: 180,
  WSW: 202.5,
  W: 225,
  WNW: 247.5,
  NW: 270,
  NNW: 292.5,
};

// Render a wind direction icon based on direction
export const renderWindDirectionIcon = (direction) => {
  console.log("Direction passed to wind direction icon:", direction);

  const rotation = windDirectionAngles[direction] || 0;
  console.log("Rotation for", direction, "is", rotation);
  
  return <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: rotation }} />;
};


// Filter a list of cities by a search keyword
export const filterCities = (keyword, allCities) => {
  if (!keyword) return [];
  return allCities.filter((city) =>
    city.toLowerCase().includes(keyword.toLowerCase())
  );
};

// Generate the path for a weather icon based on day/night and icon identifier
export const getWeatherIconPath = (isDay, icon) => {
  const path = isDay
    ? `day/${icon.slice(39, 42)}`
    : `night/${icon.slice(41, 44)}`;
  return `http://cdn.weatherapi.com/weather/128x128/${path}.png`;
};
