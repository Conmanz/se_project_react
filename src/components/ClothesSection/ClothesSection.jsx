import ItemCard from "../ItemCard/ItemCard";
import "../ItemCard/ItemCard.css";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onSelectCard, loggedIn, onCardLike }) {
  return (
    <div className="clothes__section">
      {clothingItems.map((item, index) => (
        <ItemCard
          key={`ItemCard-${index}`}
          item={item}
          onSelectCard={onSelectCard}
          loggedIn={loggedIn}
          onCardLike={onCardLike}
        />
      ))}
    </div>
  );
}

// function ClothesSection({ clothingItems, onCreateModal, onSelectCard }) {
//   const getClothingCards = () => {
//     return clothingItems.map((item) => {
//       return <ItemCard key={`ItemCard-${item._id}`} item={item} onSelectCard={onSelectCard} />;
//     });
//   };

// return (
//   <>
//     <div className="clothes__section-header">
//       <p className="clothes__section-item">Your Items</p>
//       <button type="button" className="add__clothesSection" onClick={onCreateModal}>
//         +Add new
//       </button>
//     </div>
//     <div className="clothes__section-cards">{getClothingCards()}</div>
//   </>
// );
// }

export default ClothesSection;
