import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from 'react-outside-click-handler';


function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [time, setTime] = useState("");
  const [foundCities, setFoundCities] = useState("");
  const [icon, setIcon] = useState("");
  // const [show, setShow] = useState(true);

  // GET ALL THE CITIES OF THE WORLD:
  const getCities = async () => {
    const res = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    const countriesArr = res.data.data;
    const citiesArr = countriesArr.map((Arr) => Arr.cities);
    const citiesAll = citiesArr.flat();
    setFoundCities(citiesAll);
  };
  useEffect(() => {
    getCities();
  }, []);
  const [name, setName] = useState("");
  // the search result
  const [foundUsers, setFoundUsers] = useState("");
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = foundCities.filter((user) => {
        return user.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers("");
    }
    setName(keyword);
  };

  // GET CURRENT LOCATION:
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    res.data.city === null ? setCity(res.data.IPv4) : setCity(res.data.city);
  };
  useEffect(() => {
    getData();
  }, []);

  // GET CURRENT LOCATION INFO:
  const getCurr = async () => {
    const res =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${city}&aqi=no
    `);
    console.log(res);
    setTemp(res.data.current.temp_c);
    setCondition(res.data.current.condition.text);
    const tim = res.data.location.localtime.slice(0, 10);
    const str = tim;
    const date = new Date(str);
    const today = date.toString().slice(0, 10);
    setTime(today);
    setIcon(res.data.current.condition.icon);
  };
  useEffect(() => {
    if (city !== "" && city !== " " && city !== null && city !== undefined)
      getCurr();
  });

  const handleClick = async (event) => {
    const res =
      await axios.get(`https://api.weatherapi.com/v1/current.json?key=e5a89a85ae524d618b391623223006&q=${event}&aqi=no
`);
    setTemp(res.data.current.temp_c);
    setCondition(res.data.current.condition.text);
    const tim = res.data.location.localtime.slice(0, 10);
    const str = tim;
    const date = new Date(str);
    const today = date.toString().slice(0, 10);
    setTime(today);
    setCity(res.data.location.name);
  };

  return (
    <div className="App">
      <div className="thirty">
        <div className="top-ten">
          <input
            type="search"
            id="site-search"
            name="q"
            value={name}
            onChange={filter}
            onClick={filter}
            placeholder="Search for cities"
          />

          {foundUsers && foundUsers.length > 0 ? (
            <OutsideClickHandler   className="JAMES"
            onOutsideClick={() => {
              setFoundUsers("");
            }}>
            <div className="user-list">
              {foundUsers.map((user) => (
                <li
                  className="user"
                  onClick={() => {
                    handleClick(user);
                    setFoundUsers("")
                    setName(user);
                  }}
                >
                  <span className="user-name">{user}</span>
                </li>
              ))}
            </div>
            </OutsideClickHandler>
          ) : null}
          <FontAwesomeIcon
            className="crosshair"
            icon={faLocationCrosshairs}
            onClick={getData}
          />
        </div>

        <div className="middle-eighty">
          <div className="weather-img-div">
            <img className="weather-img" src={icon} alt="jimmy" />
          </div>
          <div className="weather-temp-div">
            <h1 className="weather-temp">{temp}&#8451;</h1>
          </div>
          <div className="weather-clim-div">
            <h3 className="weather-clim">{condition}</h3>
          </div>
        </div>
        <div className="bottom-ten">
          <div className="bottom-ten-span-div">
            <span className="day">Today</span>
            <span className="date">{time}</span>
          </div>
          <div className="location-div">
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <span className="location-span">{city}</span>
          </div>
        </div>
      </div>

      <div className="seventy">
        {/* <div className="forty">
          <div className="seventy-top-twenty">
            <div className="temp-div">
              <span>Celsius</span> <span>Farenheit</span>
            </div>
          </div>
          <div className="seventy-eighty">
            <div className="five-day-weather">
              <div>
                <span>Day/Date</span>
              </div>
              <div>
                <img
                  alt="JIMBO"
                  className="jimbo"
                  src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=902&q=80"
                ></img>
              </div>
              <div>
                <span className="jimbo-span">Celsius</span>
                <span className="jimbo-span">Farenheit</span>
              </div>
            </div>
            <div className="five-day-weather">
              <div>
                <span>Day/Date</span>
              </div>
              <div>
                <img
                  alt="JIMBO"
                  className="jimbo"
                  src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=902&q=80"
                ></img>
              </div>
              <div>
                <span className="jimbo-span">Celsius</span>
                <span className="jimbo-span">Farenheit</span>
              </div>
            </div>
            <div className="five-day-weather">
              <div>
                <span>Day/Date</span>
              </div>
              <div>
                <img
                  alt="JIMBO"
                  className="jimbo"
                  src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=902&q=80"
                ></img>
              </div>
              <div>
                <span className="jimbo-span">Celsius</span>
                <span className="jimbo-span">Farenheit</span>
              </div>
            </div>
            <div className="five-day-weather">
              <div>
                <span>Day/Date</span>
              </div>
              <div>
                <img
                  alt="JIMBO"
                  className="jimbo"
                  src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=902&q=80"
                ></img>
              </div>
              <div>
                <span className="jimbo-span">Celsius</span>
                <span className="jimbo-span">Farenheit</span>
              </div>
            </div>
            <div className="five-day-weather">
              <div>
                <span>Day/Date</span>
              </div>
              <div>
                <img
                  alt="JIMBO"
                  className="jimbo"
                  src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=902&q=80"
                ></img>
              </div>
              <div>
                <span className="jimbo-span">Celsius</span>
                <span className="jimbo-span">Farenheit</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sixty">
          <div className="sixty-top-ten">
            <h3 className="today-h3">Today's Highlights</h3>
          </div>

          <div className="sixty-middle-seventy">
            <div className="today-div">
              <div>
                <h4 className="today-h4">Wind Status</h4>{" "}
                <p className="today-p"></p>
                <div className="today-wind"></div>
              </div>
            </div>
            <div className="today-div">
              <div>
                <h4 className="today-h4">Humidity</h4>{" "}
                <p className="today-p"></p>
                <div className="today-range"></div>
              </div>
            </div>
            <div className="today-div">
              <div>
                <h4 className="today-h4">Visibility</h4>{" "}
                <p className="today-p"></p>
              </div>
            </div>
            <div className="today-div">
              <div>
                <h4 className="today-h4">Air Pressure</h4>{" "}
                <p className="today-p"></p>
              </div>
            </div>
          </div>

          <div className="sixty-bottom-thirty">
            <h4>Created by Chris Kasatka blah blah blah</h4>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
