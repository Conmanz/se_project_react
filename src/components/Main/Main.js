import { defaultClothingItems } from "../../utils/Constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";
import "./Main.css";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  // console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type={"cloudy"} weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        <div className="main__subtext">Today is {weatherTemp} °F / You may want to wear:</div>
        <div className="card__items">
          {filteredCards.map((item, index) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={`filteredCards.${index}`} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
