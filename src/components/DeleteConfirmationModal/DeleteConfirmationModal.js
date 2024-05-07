import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({
  handleCloseModal,
  deleteCard,
  selectedCard,
}) => {
  return (
    <div className="modal">
      <div className="modal__confirm-content">
        <button
          className="modal__confirm-close"
          type="button"
          onClick={handleCloseModal}
          alt="close-button"
        ></button>
        <div className="modal__confirm-text">
          <div className="modal__confirm-uppertext">
            Are you sure you want to delete this item?
          </div>
          <div className="modal__confirm-lowertext">
            This action is irreversible.
          </div>
        </div>

        <div className="modal__confirm-buttons">
          <button
            className="modal__confirm-button"
            type="button"
            onClick={() => deleteCard(selectedCard)}
          >
            Yes, delete item
          </button>
          <button
            className="modal__cancel-button"
            type="button"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmationModal;
