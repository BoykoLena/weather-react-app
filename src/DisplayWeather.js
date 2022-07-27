import { useState } from "react";
import Today from "./Today";
import Icon from "./Icon";
import TodayTemp from "./TodayTemp";
import WeatherForecast from "./WeatherForecast";

function DisplayWeather(props) {
  const [unit, setUnit] = useState("celsius");

  const showFahrengeit = (event) => {
    event.preventDefault();
    setUnit("fahrengeit");
  };

  const showCelsius = (event) => {
    event.preventDefault();
    setUnit("celsius");
  };

  if (unit === "celsius") {
    return (
      <div>
        <div className="fs-3">
          <b className="itd-active">°C</b> |{" "}
          <a
            onClick={showFahrengeit}
            href="/"
            className="text-decoration-none fs-3 "
          >
            °F
          </a>
        </div>
        <Today date={props.data.date} />
        <div className="d-flex justify-content-center align-items-center">
          <Icon icon={props.data.icon} />
          <div className="ms-1">
            <h2 className="text-center mb-0">
              <TodayTemp temp={props.data.temp} unit={unit} />
            </h2>
            <p className="m-0">{props.data.description}</p>
          </div>
        </div>
        <WeatherForecast
          lat={props.data.lat}
          lon={props.data.lon}
          apiKey={props.apiKey}
          unit={unit}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="fs-3">
          <a
            onClick={showCelsius}
            href="/"
            className="text-decoration-none fs-3 "
          >
            °C
          </a>{" "}
          | <b className="itd-active">°F</b>
        </div>
        <Today date={props.data.date} unit={unit} />
        <div className="d-flex justify-content-center align-items-center">
          <Icon icon={props.data.icon} />
          <div className="ms-1">
            <h2 className="text-center mb-0">
              <TodayTemp temp={props.data.temp} unit={unit} />
            </h2>
            <p className="m-0">{props.data.description}</p>
          </div>
        </div>
        <WeatherForecast
          lat={props.data.lat}
          lon={props.data.lon}
          apiKey={props.apiKey}
        />
      </div>
    );
  }
}

export default DisplayWeather;
