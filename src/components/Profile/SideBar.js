import avatar from "../../images/wtwrAvatarTrue.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="sideBar__section">
      <div className="sideBar__container">
        <img className="sideBar__avatar" src={avatar} />
        <p className="sideBar__name">Connor Zimmerman</p>
      </div>
    </section>
  );
}

export default SideBar;
