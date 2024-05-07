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

export default ClothesSection;
