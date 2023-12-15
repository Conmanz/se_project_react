import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img src={item.imageUrl} className="card__image" onClick={() => onSelectCard(item)} alt={"card__image"} />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
