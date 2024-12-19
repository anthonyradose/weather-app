import React from "react";

const UnitToggle = ({ onCelsiusClick, onFahrenheitClick }) => {
  return (
    <div className="unit-toggle-container">
      <button onClick={onCelsiusClick} className="unit-toggle-button">
        °C
      </button>
      <button onClick={onFahrenheitClick} className="unit-toggle-button">
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
