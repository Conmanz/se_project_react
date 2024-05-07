import avatar from "../../images/wtwrAvatarTrue.svg";
import "./SideBar.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUser";

function SideBar({ showProfileModal, logoutUser }) {
  const currentUser = useContext(CurrentUserContext);
  const renderSideBarName = () => {
    if (currentUser) {
      return (
        <Link to="/profile" className="header__avatar-name">
          {currentUser.name}
        </Link>
      );
    }
  };
  return (
    <section className="sideBar__section">
      <div className="sideBar__container-userProfile">
        <img className="sideBar__profile-avatar" src={currentUser.avatar} />
        <p className="sideBar__profile-name">{renderSideBarName()}</p>
      </div>
      <div className="sideBar__container-editProfile">
        <button className="sideBar__profile-change" onClick={showProfileModal}>
          Change profile data
        </button>
      </div>
      <div className="sideBar__container-logoutProfile">
        <button className="sideBar__profile-logout" onClick={logoutUser}>
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
