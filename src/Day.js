function Day(props) {
  const date = new Date(props.date * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return <h5>{day}</h5>;
}

export default Day;
