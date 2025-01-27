import React from "react";
import "../App.css";

const PercentageBar = ({ bgcolor, completed }) => {
  return (
    <div className="percentage-container">
      <div
        className="filler"
        style={{
          width: `${completed}%`,
          backgroundColor: bgcolor,
        }}
      ></div>
    </div>
  );
};

export default PercentageBar;
