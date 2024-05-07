import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import "./ItemCard.css";
import likeDisabled from "../../images/Like-disabled-button.svg";
import likeEnabled from "../../images/Like-enabled-button.svg";

const ItemCard = ({ item, onSelectCard, onCardLike, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const id = item._id;
  const isLiked = item.likes?.some((user) => {
    return user.includes(currentUser?._id);
  });
  const likeButtonClass = `itemcard__likebutton ${
    isLiked ? "itemcard__likebutton_liked" : ""
  }`;

  const likeButtonImage = isLiked ? likeEnabled : likeDisabled;

  return (
    <div className="itemCard">
      <div className="itemCard__container">
        <div className="itemCard__header">
          <div className="card__name">{item.name}</div>
          {loggedIn && (
            <button
              className={likeButtonClass}
              type="button"
              onClick={() => {
                onCardLike(id, isLiked);
              }}
            >
              <img src={likeButtonImage} alt={"Button Like Image"} />
            </button>
          )}
        </div>
        <div className="itemCard__items">
          <div>
            <img
              src={item.imageUrl}
              className="card__image"
              onClick={() => onSelectCard(item)}
              alt={item.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
