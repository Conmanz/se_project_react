import { defaultClothingItems } from "../../utils/Constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
// import { useMemo, useContext } from "react";
import "./Main.css";
// import { CurrentTemperatureUnitContext } from "../Contexts/CurrentTemperatureUnitContext";

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

// function Main({ weatherTemp, weatherType, onSelectCard }) {
//   const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
//   const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 99;
//   const getWeatherType = () => {
//     if (temp >= 86) {
//       return "hot";
//     } else if (temp >= 66 && temp <= 85) {
//       return "warm";
//     } else if (temp <= 65) {
//       return "cold";
//     }
//   };

//   const weatherType = getWeatherType();

//   const filteredCards = defaultClothingItems.filter((item) => {
//     return item.weather.toLowerCase() === weatherType;
//   });

//   return (
//     <main className="main">
//       <WeatherCard day={false} type={"cloudy"} weatherTemp={temp} />
//       <section className="card__section" id="card-section">
//         <div className="main__subtext">Today is {temp} °F / You may want to wear:</div>
//         <div className="card__items">
//           {filteredCards.map((item, index) => (
//             <ItemCard item={item} onSelectCard={onSelectCard} key={`filteredCards.${index}`} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

export default Main;
