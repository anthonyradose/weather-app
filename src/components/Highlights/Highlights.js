import React, { useState, useEffect } from "react";
import { windDirection } from "../../utils/utils";
import PercentageBar from "../PercentageBar/PercentageBar";
import { getCurr } from "../../services/api";
import "./Highlights.css";

function Highlights() {
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [air, setAir] = useState("");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    getCurr().then((data) => {
      setWind(data.wind);
      setHumidity(data.humidity);
      setVisibility(data.visibility);
      setAir(data.air);
      setDirection(data.direction);
    });
  }, []);

  return (
    <div className="highlights-container">
      <div className="highlights-header">
        <h3 className="highlights-title">Today's Highlights</h3>
      </div>
      <div className="highlights-body">
        <div className="highlight-card">
          <div>
            <h4 className="highlight-title">Wind Status</h4>
            <p className="highlight-value">{wind}mph</p>
            <div className="wind-direction">
              {windDirection(direction)}
              {direction}
            </div>
          </div>
        </div>
        <div className="highlight-card">
          <div>
            <h4 className="highlight-title">Humidity</h4>
            <p className="highlight-value">{humidity}%</p>
            <div className="humidity-bar">
              <PercentageBar bgcolor="yellow" completed={humidity} />
            </div>
          </div>
        </div>
        <div className="highlight-card">
          <div>
            <h4 className="highlight-title">Visibility</h4>
            <p className="highlight-value">{visibility}miles</p>
          </div>
        </div>
        <div className="highlight-card">
          <div>
            <h4 className="highlight-title">Air Pressure</h4>
            <p className="highlight-value">{air}mb</p>
          </div>
        </div>
      </div>
      <div className="highlights-footer">
        <h4>Created by Anthony Radose</h4>
      </div>
    </div>
  );
}

export default Highlights;