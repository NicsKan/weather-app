import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const api = {
  key: "01a18f783dfb10d31e3d07e7caed2a38",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState();
  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    callApi();
    console.log(weatherData);
  }, []);

  const callApi = () => {
    const url = `${api.baseUrl}weather?q=${searchTerm}&units=metric&appid=${api.key}`;
    axios
      .get(url)
      .then(response => {
        setSearchTerm("");
        console.log(response.data);
        setWeatherData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = event => {
    if (event.key == "Enter") {
      callApi();
      console.log(weatherData);
    }
    setSearchTerm(event.target.value);
  };

  const classNameFW = weatherData
    ? weatherData.main.temp > 16
      ? "app warm"
      : "app"
    : "app";

  return (
    <div className={classNameFW}>
      <main className="main">
        <div className="search-box">
          <input
            type="text"
            name="searchTerm"
            className="search-bar"
            placeholder="Search..."
            onKeyDown={handleChange}
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
        {typeof weatherData != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {weatherData ? Math.round(weatherData.main.temp) : null}
                °c
              </div>
              <div className="weather">
                {weatherData ? weatherData.weather[0].main : null}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
