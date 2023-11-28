import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/WeatherApi";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [cityName, setCityName] = useState("");

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
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        setCityName(data.name);
      })
      .catch(console.error);
  }, []);

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

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <Header onCreateModal={handleCreateModal} location={cityName} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          name={"New_Garment"}
          title={"New Garment"}
          onClose={handleCloseModal}
          handleClick={handleClick}
          buttonText={"Add garment"}
        >
          <label className="modal__name-input">
            Name
            <input className="modal__name-submit" type="text" name="name" placeholder="Name" minLength="1" maxLength="30" />
          </label>
          <label className="modal__image-input">
            Image
            <input
              className="modal__image-submit"
              type="url"
              name="link"
              placeholder="Image URL"
              minLength="1"
              maxLength="30"
            />
          </label>
          <p className="weather__text">Select the weather type:</p>
          <div>
            <div className="hot__input">
              <input className="hot__button" type="radio" id="hot" value="hot" name="weather-type" />
              <label for="hot">Hot</label>
            </div>
            <div className="warm__input">
              <input className="warm__button" type="radio" id="warm" value="warm" name="weather-type" />
              <label for="warm">Warm</label>
            </div>
            <div className="cold__input">
              <input className="cold__button" type="radio" id="cold" value="cold" name="weather-type" />
              <label for="cold">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} handleClick={handleClick} />
      )}
    </div>
  );
};

export default App;
