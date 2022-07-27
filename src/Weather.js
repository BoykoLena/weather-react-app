import { useState } from "react";
import "./Weather.css";
import "bootstrap/dist/css/bootstrap.css";
import Card from "./Card";
import axios from "axios";
import Updated from "./Updated";
import Moment from "react-moment";
import DisplayWeather from "./DisplayWeather";

function Weather(props) {
  const apiKey = "70d3ffa9a4880bd0019219a54fdf13d4";
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  const searchCity = () => {
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(urlApi).then(showResponce);
  };

  const searchCoords = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(urlApi).then(showResponce);
  };

  const citySubmit = (event) => {
    event.preventDefault();
    searchCity();
  };

  const correctCity = (event) => {
    setCity(event.target.value);
  };

  const getCoords = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCoords);
  };

  const showResponce = (responce) => {
    setWeatherData({
      ready: true,
      cityName: responce.data.name,
      country: responce.data.sys.country,
      temp: responce.data.main.temp,
      description: responce.data.weather[0].description,
      date: new Date(responce.data.dt * 1000),
      icon: responce.data.weather[0].icon,
    });
  };

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="text-end">
          <a onClick={getCoords} className="check" href="/">
            📍 check the weather in your area{" "}
          </a>
          <span>or</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">{weatherData.cityName}</h1>
          <form onSubmit={citySubmit}>
            <input
              type="text"
              placeholder="Enter city..."
              className="me-3"
              onChange={correctCity}
            ></input>
            <input className="submit" type="submit" value="search"></input>
          </form>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0">{weatherData.country}</p>
          <Updated date={weatherData.date} />
        </div>
        <div className="mb-2">
          <Moment format="dddd HH:mm:ss" interval={1000} />
        </div>
        <DisplayWeather data={weatherData} />
        <div className="d-flex justify-content-around">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  } else {
    searchCity();
    return <div className="text-center">LOADING...</div>;
  }
}

export default Weather;
