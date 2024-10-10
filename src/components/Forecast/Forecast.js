import React, { useState, useEffect } from "react";
import { getFut } from "../../services/api";
import "./Forecast.css";

function Forecast() {
  const [day, setDay] = useState([]);

  useEffect(() => {
    getFut().then(setDay);
  }, []);

  return (
    <div className="forecast-container">
      <div className="forecast-list">{day}</div>
    </div>
  );
}

export default Forecast;