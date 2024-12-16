// src/components/CurrentDayInfo.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const CurrentDayInfo = ({ time, cityName }) => {
  return (
    <div className="current-day-info">
      <div className="day-date">
        <span className="day-name">Today</span>
        <span className="date">{time}</span>
      </div>
      <div className="location-info">
        <span>
          <FontAwesomeIcon icon={faLocationDot} />
        </span>
        <span className="location-name">{cityName}</span>
      </div>
    </div>
  );
};

export default CurrentDayInfo;
