import { defaultClothingItems } from "../../utils/Constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
// import { useMemo, useContext } from "react";
import "./Main.css";

function Main({ cards, weatherTemp, onSelectCard }) {
  return (
    <main className="main">
      <WeatherCard day={false} type={"cloudy"} weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        <div className="main__subtext">Today is {weatherTemp} °F / You may want to wear:</div>
        <div className="card__items">
          {cards.map((item, index) => (
            <ItemCard key={`filteredCards.${index}`} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
