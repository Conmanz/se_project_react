import "./WeatherCard.css";
import { weatherOptions } from "../../utils/Constants";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  }).url;

  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp} °F</div>
      <img src={weatherOption} className="weather__image" />
    </section>
  );
};

export default WeatherCard;
