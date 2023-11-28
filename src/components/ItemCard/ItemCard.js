const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img src={item.link} className="card__image" onClick={() => onSelectCard(item)} alt={"card__image"} />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
