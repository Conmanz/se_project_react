import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, useMemo } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData, parseLocation } from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/Constants";
import { getItems, addItem, removeItem } from "../../utils/api";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [filteredCards, setFilteredCards] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);
  const [location, setLocation] = useState("");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const newTemperature = parseWeatherData(data);
        const city = parseLocation(data);

        setTemperature(newTemperature);
        setLocation(city);
      })
      .catch((error) => {
        console.error("error:", error);
      });

    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredCards(
      clothingItems.filter((item) => {
        return item.weather.toLowerCase() === getWeatherType();
      })
    );
  }, [clothingItems, temperature]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && activeModal !== "") {
      setActiveModal("");
    }
  };

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveModal("");
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const getWeatherType = () => {
    const weatherTemp = temperature.temperature?.[currentTemperatureUnit];

    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const deleteCard = (cardToDelete) => {
    removeItem(cardToDelete._id)
      .then(() => {
        const newClothingItems = [...clothingItems].filter((card) => card._id !== cardToDelete._id);
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const addCard = ({ name, imageUrl, weather }) => {
    const item = {
      _id: null,
      name,
      imageUrl,
      weather,
    };
    addItem(item)
      .then((res) => {
        setClothingItems([...clothingItems, res]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <Header onCreateModal={handleCreateModal} location={cityName} />
        <Switch>
          <Route exact path="/">
            <Main
              cards={filteredCards}
              weatherTemp={temperature.temperature?.[currentTemperatureUnit]}
              onSelectCard={handleSelectedCard}
            />
          </Route>
          <Route path="/profile">
            <Profile cards={filteredCards} onSelectCard={handleSelectedCard} onCreateModal={handleCreateModal} />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal handleCloseModal={handleCloseModal} onAddItem={addCard} handleClick={handleClick} />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleClick={handleClick}
            handleDelete={deleteCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;
