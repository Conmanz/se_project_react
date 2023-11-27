import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleClick }) => {
  return (
    <div className={`modal`} onClick={handleClick}>
      <div className="modal__content modal__container_item_view">
        <button className="close__button-item" type="button" onClick={onClose} />
        <img className="modal__image" src={selectedCard.link} alt={"PLACEHOLDER"} />
        <div className="item__name">{selectedCard.name}</div>
        <div className="selected__card-weather">Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
