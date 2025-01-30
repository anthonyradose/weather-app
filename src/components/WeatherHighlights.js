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
        <h4>Photo by <a rel="noopener noreferrer" target="_blank" href="https://unsplash.com/@omarvellous14?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Omar Ramadan</a> on <a rel="noopener noreferrer" target="_blank" href="https://unsplash.com/photos/green-grass-field-under-blue-sky-and-white-clouds-during-daytime-vcRHpfrsaL8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </h4>
      
      </div>
    </div>
  );
};

export default WeatherHighlights;
