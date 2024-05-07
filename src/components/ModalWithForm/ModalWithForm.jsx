import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText, title, onClose, name, handleClick, onSubmit, canSubmit }) => {
  return (
    <div className={`modal modal_type_${name}`} onClick={handleClick}>
      <div className="modal__content">
        <button className="close__button-form" type="button" onClick={onClose} />
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit}>
          {children}
          <button className="modal__submit-form" type="submit" disabled={!canSubmit}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
