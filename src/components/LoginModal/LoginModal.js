import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ onClose, loginUser, loading, openRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginUser({ email, password });
  }

  return (
    <ModalWithForm
      name={"login"}
      title={"Log In"}
      onClose={onClose}
      buttonText={"Log In"}
      onSubmit={handleSubmit}
      loading={loading}
      canSubmit={!!email && !!password}
    >
      <div className="login-modal__email-input">
        <label htmlFor="email-input" className="modal__input-title">
          Email
        </label>
        <input
          id="email-input"
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        ></input>
      </div>
      <div className="login-modal__password-input">
        <label htmlFor="password-input" className="modal__input-title">
          Password
        </label>
        <input
          id="password-input"
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </div>
      <button
        className={"login-modal__signup-input"}
        onClick={openRegisterModal}
      >
        To Sign up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
