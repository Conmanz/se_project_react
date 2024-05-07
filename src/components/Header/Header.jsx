import "./Header.css";
import React, { useContext } from "react";
import avatarImage from "../../images/wtwrAvatarTrue.svg";
import logoImage from "../../images/wtwrLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUser";

const Header = ({ isLoggedIn, onCreateModal, location, onLogIn, onSignUp, signUp, logIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

  const renderHeaderUserSection = () => {
    if (isLoggedIn && currentUser) {
      return (
        <>
          <div>
            <button className="header__clothes-button" type="text" onClick={onCreateModal}>
              + Add Clothes
            </button>
          </div>
          <Link to="/profile" className="header__avatar-name">
            {currentUser.name}
          </Link>
          <div>
            <img src={currentUser.avatar} alt="avatar" className="header__avatar-image" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <button type="button" className="header__button" onClick={onSignUp}>
            Sign Up
          </button>
          <button type="button" className="header__button" onClick={onLogIn}>
            Log In
          </button>
        </>
      );
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo" />
          </Link>
        </div>
        <div className="current__date">
          {currentDate}, {location}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {renderHeaderUserSection()}
      </div>
    </header>
  );
};

export default Header;
