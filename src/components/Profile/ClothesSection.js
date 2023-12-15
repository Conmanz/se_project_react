import ItemCard from "../ItemCard/ItemCard";
import "../ItemCard/ItemCard.css";
import "./ClothesSection.css";

// {
//     imageUrl: url,
//     id: number,
//     name: string
// }

function ClothesSection({ clothingItems, onCreateModal, onSelectCard }) {
  const getClothingCards = () => {
    return clothingItems.map((item) => {
      return <ItemCard key={`ItemCard-${item._id}`} item={item} onSelectCard={onSelectCard} />;
    });
  };

  return (
    <section>
      <div className="clothes__section-header">
        <p className="clothes__section-item">Your Items</p>
        <button type="button" className="add__clothesSection" onClick={onCreateModal}>
          +Add new
        </button>
      </div>
      <div>{getClothingCards()}</div>
    </section>
  );
}

export default ClothesSection;
