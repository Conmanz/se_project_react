import "./Header.css";
import React from "react";
import avatarImage from "../../images/wtwrAvatarTrue.svg";
import logoImage from "../../images/wtwrLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, location }) => {
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

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
        <div>
          <button className="header__clothes-button" type="text" onClick={onCreateModal}>
            + Add Clothes
          </button>
        </div>
        <Link to="/profile" className="header__avatar-name">
          Connor Zimmerman
        </Link>
        <div>
          <img src={avatarImage} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
