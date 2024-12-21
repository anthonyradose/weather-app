import React from "react";

const HighlightCard = ({ title, value, unit, children }) => {
  return (
    <div className="highlight-card">
      <div>
        <h4 className="highlight-title">{title}</h4>
        <p className="highlight-value">
          {value}
          {unit}
        </p>
        {children}
      </div>
    </div>
  );
};

export default HighlightCard;
