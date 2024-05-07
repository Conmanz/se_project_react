import { CurrentUserContext } from "../../contexts/CurrentUser";
import "./ItemModal.css";
import React, { useContext } from "react";

const ItemModal = ({
  selectedCard,
  onClose,
  handleClick,
  showConfirmationModal,
}) => {
  const currentUser = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `selected-card__delete-button ${
    isOwn
      ? "selected-card__delete-button_visible"
      : "selected-card__delete-button_hidden"
  }`;

  return (
    <div className={`modal`} onClick={handleClick}>
      <div className="modal__content modal__container_item_view">
        <button
          className="selected-card__close-button"
          type="button"
          onClick={onClose}
        />
        <img
          className="selected-card__image"
          src={selectedCard.imageUrl}
          alt={"modal__image"}
        />
        <div className="selected-card__container">
          <div className="selected-card__name">{selectedCard.name}</div>
          <div>
            <button
              className={itemDeleteButtonClassName}
              onClick={() => {
                showConfirmationModal(selectedCard);
              }}
            >
              Delete item
            </button>
          </div>
        </div>
        <div className="selected-card__weather">
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
