import { useState } from "react";
import "./Weather.css";
import "bootstrap/dist/css/bootstrap.css";
import Card from "./Card";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("London");
  const [cityName, setCityName] = useState("Lviv");
  const [country, setCountry] = useState("UA");
  const [temp, setTemp] = useState(15);
  const [description, setDescription] = useState("clear sky");
  const [icon, setIcon] = useState("./img/clear_sky.png");
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [day, setDay] = useState("");
  const [updateHours, setUpdateHours] = useState("15");
  const [updateMinutes, setUpdateMinutes] = useState("23");
  const [actualDay, setActualDay] = useState("Monday");
  const [num, setNumber] = useState("25");
  const [month, setMonth] = useState("July");
  const [year, setYear] = useState(2002);
  const [celsius, setCelsius] = useState("°C");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
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
    "December",
  ];

  const correctCity = (event) => {
    setCity(event.target.value);
  };

  const showResponce = (responce) => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let dayNumber = date.getDay();
    let day = days[dayNumber];
    let num = date.getDate();
    let monthNum = date.getMonth();
    let month = months[monthNum];
    let year = date.getFullYear();

    setUpdateHours(hours);
    setUpdateMinutes(minutes);
    setActualDay(day);
    setNumber(num);
    setMonth(month);
    setYear(year);

    setCityName(responce.data.name);
    setCountry(responce.data.sys.country);
    setTemp(responce.data.main.temp);
    setDescription(responce.data.weather[0].description);

    let iconDescription = responce.data.weather[0].main;

    if (iconDescription === "Clear") {
      setIcon("./img/clear_sky.png");
    }
    if (iconDescription === "Clouds") {
      setIcon("./img/scattered_clouds.png");
    }
    if (iconDescription === "Rain") {
      setIcon("./img/shower_rain.png");
    }
    if (iconDescription === "Drizzle") {
      setIcon("./img/light_rain.png");
    }
    if (iconDescription === "Thunderstorm") {
      setIcon("./img/thunderstorm.png");
    }
    if (iconDescription === "Snow") {
      setIcon("./img/snow.png");
    }
    if (
      iconDescription === "Mist" ||
      iconDescription === "Smoke" ||
      iconDescription === "Haze" ||
      iconDescription === "Dust" ||
      iconDescription === "Fog" ||
      iconDescription === "Sand" ||
      iconDescription === "Ash" ||
      iconDescription === "Squall" ||
      iconDescription === "Tornado"
    ) {
      setIcon("./img/mist.png");
    }

    console.log(responce);
  };

  const getCoords = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocalResponce);
  };

  const getLocalResponce = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "70d3ffa9a4880bd0019219a54fdf13d4";
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(urlApi).then(showResponce);
  };

  const getResponce = (event) => {
    event.preventDefault();
    let apiKey = "70d3ffa9a4880bd0019219a54fdf13d4";
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(urlApi).then(showResponce);
  };

  const actualTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let dayNumber = date.getDay();
    let day = days[dayNumber];

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    setHours(hours);
    setMinutes(minutes);
    setDay(day);
  };

  const cels = () => {
    alert("hello");
  };

  setInterval(actualTime);

  return (
    <div className="Weather">
      <div className="text-end">
        <a className="check" onClick={getCoords} href="/">
          📍 check the weather in your area{" "}
        </a>
        <span>or</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-0">{cityName}</h1>
        <form>
          <input
            type="text"
            placeholder="Enter city..."
            className="me-3"
            onChange={correctCity}
          ></input>
          <input
            className="submit"
            type="submit"
            value="search"
            onClick={getResponce}
          ></input>
        </form>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="m-0">{country}</p>
        <p className="m-0">
          last updated: {updateHours}:{updateMinutes}
        </p>
      </div>
      <div className="mb-2">
        {day} {hours}:{minutes}
      </div>
      <div className="fs-3">
        <a href="/" className="text-decoration-none fs-3" onClick={cels}>
          °C
        </a>{" "}
        |{" "}
        <a href="/" className="text-decoration-none fs-3">
          °F
        </a>
      </div>
      <div className="text-center mb-5">
        <h2>{actualDay}</h2>
        <h2 className="mb-4">
          {num} {month} {year}
        </h2>
        <div className="d-flex justify-content-center align-items-center">
          <img
            className="me-4"
            width={70}
            height={70}
            src={icon}
            alt="weather-icon"
          />
          <div>
            <h2 className="mb-0">
              {Math.round(temp)}
              {celsius}
            </h2>
            <p className="m-0">{description}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Weather;
