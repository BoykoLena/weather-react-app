function TodayTemp(props) {
  if (props.unit === "celsius") {
    return (
      <h2 className="text-center mb-0">
        {Math.round(props.temp)}
        °C{" "}
      </h2>
    );
  } else {
    return (
      <h2 className="text-center mb-0">
        {Math.round((props.temp * 9) / 5 + 32)}
        °F{" "}
      </h2>
    );
  }
}

export default TodayTemp;
