import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from "react-outside-click-handler";
import { getCities, getData } from "../../services/api";
import "./SearchBar.css";

function SearchBar(handleClick) {
  const [name, setName] = useState("");
  const [foundCities, setFoundCities] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    getCities().then(setFoundCities);
  }, []);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = foundCities.filter((user) =>
        user.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setFoundUsers(results);
    } else {
      setFoundUsers([]);
    }
    setName(keyword);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="search"
          id="site-search"
          name="q"
          value={name}
          onChange={filter}
          onClick={filter}
          className="search-input"
          placeholder="Search for cities"
        />
        <FontAwesomeIcon
          className="search-icon"
          icon={faLocationCrosshairs}
          onClick={getData}
        />
      </div>
      {foundUsers.length > 0 && (
        <OutsideClickHandler
          className="search-results"
          onOutsideClick={() => setFoundUsers([])}
        >
          <div className="city-list">
            {foundUsers.map((user) => (
              <li
                key={user}
                className="city-item"
                onClick={() => {
                  handleClick(user);
                  setFoundUsers([]);
                  setName(user);
                }}
              >
                <span className="city-name">{user}</span>
              </li>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
}

export default SearchBar;