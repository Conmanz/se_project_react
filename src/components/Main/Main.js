import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Main({
  cards,
  weatherTemp,
  onSelectCard,
  weatherType,
  loggedIn,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main className="main">
      <WeatherCard day={false} type={"cloudy"} weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        <div className="main__subtext">
          Today is {weatherTemp} {currentTemperatureUnit} / You may want to
          wear:
        </div>
        <ClothesSection
          clothingItems={cards}
          onSelectCard={onSelectCard}
          loggedIn={loggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </main>
  );
}

export default Main;
