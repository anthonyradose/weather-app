import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Forecast from "./components/Forecast/Forecast";
import Highlights from "./components/Highlights/Highlights";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <SearchBar />
      <WeatherInfo />
      <Forecast />
      <Highlights />
    </div>
  );
}

export default App;