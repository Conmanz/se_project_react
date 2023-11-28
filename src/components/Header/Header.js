import "./Header.css";
import React from "react";

const Header = ({ onCreateModal, location }) => {
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

  return (
    <header className="header">
      <div className="header__container">
        <div>
          <img src={require("../../images/wtwrLogo.svg").default} alt="logo" />
        </div>
        <div className="current__date">
          {currentDate}, {location}
        </div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button className="header__avatar-logo" type="text" onClick={onCreateModal}>
            + Add Clothes
          </button>
        </div>
        <div className="header__avatar-name">Connor Zimmerman</div>
        <div>
          <img src={require("../../images/wtwrAvatarTrue.svg").default} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
