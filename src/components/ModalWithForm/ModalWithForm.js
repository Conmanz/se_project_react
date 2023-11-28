import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText = "Add garment", title, onClose, name, handleClick }) => {
  return (
    <div className={`modal modal_type_${name}`} onClick={handleClick}>
      <div className="modal__content">
        <button className="close__button-form" type="button" onClick={onClose} />
        <h3 className="modal__title">{title}</h3>
        <form>
          {children}
          <button className="modal__submit-form" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
