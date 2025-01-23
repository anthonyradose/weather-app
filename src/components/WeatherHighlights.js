import React from "react";
import PercentageBar from "./PercentageBar";
import HighlightCard from "./HighlightCard";
import { renderWindDirectionIcon } from "../utils/utils"; // Import here


const WeatherHighlights = ({
  windSpeed,
  humidity,
  visibility,
  airPressure,
  direction,

}) => {
  return (
    <div className="weather-highlights">
      <div className="highlights-title-container">
        <h3 className="highlights-title">Today's Highlights</h3>
      </div>

      <div className="highlights-body">
        <HighlightCard title="Wind Status" value={windSpeed} unit="mph">
          <div className="wind-compass">
          {renderWindDirectionIcon(direction)}
            {direction}
          </div>
        </HighlightCard>

        <HighlightCard title="Humidity" value={humidity} unit="%">
          <div className="humidity-bar">
            <PercentageBar bgcolor="yellow" completed={humidity} />
          </div>
        </HighlightCard>

        <HighlightCard title="Visibility" value={visibility} unit="miles" />

        <HighlightCard title="Air Pressure" value={airPressure} unit="mb" />
      </div>

      <div className="credits-section">
        <h4>Created by Anthony Radose</h4>
      </div>
    </div>
  );
};

export default WeatherHighlights;
