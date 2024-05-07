import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  cards,
  onSelectCard,
  onCreateModal,
  showEditProfileModal,
  logoutUser,
  loggedIn,
}) {
  return (
    <div className="profile__container">
      <SideBar
        showProfileModal={showEditProfileModal}
        logoutUser={logoutUser}
      />
      <section className="card__section" id="card-section">
        <div className="clothes__section-header">
          <p className="clothes__section-item">Your Items</p>
          <button
            type="button"
            className="add__clothesSection"
            onClick={onCreateModal}
          >
            +Add new
          </button>
        </div>
        <ClothesSection
          className="profile__image"
          clothingItems={cards}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
          loggedIn={loggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
