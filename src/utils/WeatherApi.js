import { APIkey, Latitude, Longitude } from "./Constants";
import { processServerResponse } from "./api";

export const getForecastWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
};

// export const parseWeatherData = (data) => {
//   const main = data.main;
//   const temperature = main && main.temp;
//   return { temperature: { F: Math.round(temperature), C: Math.round(((temperature - 32) * 5) / 9) } };
// };

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};

export const parseLocation = (data) => {
  const city = data.name;
  return city;
};

// weather.temperature.F = `${Math.round(data.main.temp)}°F`;
// weather.temperature.C = `${Math.round((data.main.temp - 32) * 5/9)}°C`;
