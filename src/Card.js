import Day from "./Day";
import ForecasIcon from "./ForecastIcon";
import TodayTemp from "./TodayTemp";

function Card(props) {
  return (
    <div className="text-center">
      <Day date={props.data.dt} />
      <ForecasIcon icon={props.data.weather[0].icon} />
      <h5 className="mb-0">
        {" "}
        <TodayTemp temp={props.data.temp.day} unit={props.unit} />
      </h5>
      <div className="m-0">
        <TodayTemp temp={props.data.temp.min} unit={props.unit} />
      </div>
    </div>
  );
}

export default Card;
