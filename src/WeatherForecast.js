import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(false);
  }, [props.lat, props.lon]);

  const ShowResponce = (responce) => {
    setForecast(responce.data.daily);
    setLoad(true);
  };

  if (load) {
    return (
      <div className="d-flex justify-content-around">
        <Card data={forecast[1]} unit={props.unit} />
        <Card data={forecast[2]} unit={props.unit} />
        <Card data={forecast[3]} unit={props.unit} />
        <Card data={forecast[4]} unit={props.unit} />
      </div>
    );
  } else {
    const urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&appid=${props.apiKey}&units=metric`;
    axios.get(urlApi).then(ShowResponce);

    return <div>Loading...</div>;
  }
}

export default WeatherForecast;
