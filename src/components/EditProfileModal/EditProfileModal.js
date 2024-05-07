import { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, updateUser, loading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAvatarChange(event) {
    setAvatar(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUser({ name, avatar });
  }

  return (
    <ModalWithForm
      name={"EditProfileForm"}
      title={"Change profile data"}
      onClose={onClose}
      buttonText={"Save changes"}
      onSubmit={handleSubmit}
      loading={loading}
      canSubmit={!!name && !!avatar}
    >
      <div className="editprofile__modal">
        <div className="editprofile__input-title">
          <label htmlFor="email-input">Name*</label>
          <input
            id="name-input"
            className="editprofile__change-name"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="editprofile__input-avatar">
          <label htmlFor="password-input">Avatar*</label>
          <input
            id="password-input"
            className="editprofile__change-avatar"
            type="url"
            name="avatar"
            placeholder="Avatar"
            required
            value={avatar}
            onChange={handleAvatarChange}
          ></input>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
