function TodayTemp(props) {
  if (props.unit === "celsius") {
    return (
      <div>
        {Math.round(props.temp)}
        °C{" "}
      </div>
    );
  } else {
    return (
      <div>
        {Math.round((props.temp * 9) / 5 + 32)}
        °F{" "}
      </div>
    );
  }
}

export default TodayTemp;
