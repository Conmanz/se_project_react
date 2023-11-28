import "./WeatherCard.css";

const weatherOptions = [
  { url: require("../../Images/Day/daySunny.svg").default, day: true, type: "sunny" },
  { url: require("../../Images/Day/dayCloudy.svg").default, day: true, type: "cloudy" },
  { url: require("../../Images/Night/nightCloudy.svg").default, day: false, type: "cloudy" },
  { url: require("../../Images/Night/nightClear.svg").default, day: false, type: "clear" },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions
    .filter((i) => {
      return i.day === day && i.type === type;
    })
    .map((i) => i.url);

  //   const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp} °F</div>
      <img src={imageSrc} className="weather__image" />
    </section>
  );
};

export default WeatherCard;
