import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "./Profile.css";

function Profile({ cards, onSelectCard, onCreateModal }) {
  return (
    <div className="profile__container">
      <SideBar />
      <div className="clothes__section">
        <ClothesSection
          className="profile__image"
          clothingItems={cards}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
        />
      </div>
    </div>
  );
}

export default Profile;
