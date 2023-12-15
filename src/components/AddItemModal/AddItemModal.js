import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, handleClick }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      name={"New_Garment"}
      title={"New Garment"}
      onClose={handleCloseModal}
      handleClick={handleClick}
      buttonText={"Add garment"}
      onSubmit={handleSubmit}
      canSubmit={!!name && !!imageUrl & !!weather}
    >
      <label className="modal__name-input">
        Name
        <input
          className="modal__name-submit"
          type="text"
          name="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__image-input">
        Image
        <input
          className="modal__image-submit"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          minLength="1"
          // maxLength="30"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <p className="weather__text">Select the weather type:</p>
      <div>
        <div className="hot__input">
          <input
            className="hot__button"
            type="radio"
            id="hot"
            value="hot"
            name="weather-type"
            onClick={() => setWeather("hot")}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div className="warm__input">
          <input
            className="warm__button"
            type="radio"
            id="warm"
            value="warm"
            name="weather-type"
            onClick={() => setWeather("warm")}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div className="cold__input">
          <input
            className="cold__button"
            type="radio"
            id="cold"
            value="cold"
            name="weather-type"
            onClick={() => setWeather("cold")}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
