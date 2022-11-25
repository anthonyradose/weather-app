import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const formatDate = (str) => {
  const date = new Date(str);
  const options = { weekday: "long", day: "numeric", month: "long" };

  const dateStr = date.toLocaleDateString(undefined, options);

  return dateStr;
};

/*We create a const that receives an object and each of its properties.
       will be the values corresponding to our types*/

export const windDirection = (direction) => {
  const windDirections = {
    N: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: -45 }} />,
    NNE: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: -22.5 }} />
    ),
    NE: <FontAwesomeIcon icon={faLocationArrow} />,
    ENE: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 22.5 }} />
    ),
    E: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 45 }} />,
    ESE: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 67.5 }} />
    ),
    SE: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 90 }} />,
    SSE: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 112.5 }} />
    ),
    S: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 135 }} />,
    SSW: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 157.5 }} />
    ),
    SW: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 180 }} />,
    WSW: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 202.5 }} />
    ),
    W: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 225 }} />,
    WNW: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 247.5 }} />
    ),
    NW: <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 270 }} />,
    NNW: (
      <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: 292.5 }} />
    ),
  };
  return windDirections[direction];
};
