import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike })
{
  const currentUser = React.useContext(CurrentUserContext);
  const handleClick = () => onCardClick(card);
  const handleLike = () => onCardLike(card);
  const handleDelete = () => onCardDelete(card);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <div className="element">
      <button type="button" className="element__zoom" aria-label="Открыть оригинал фото" onClick={handleClick}>
        <div style={{ backgroundImage: `url(${card.link})` }} className="element__image" />
      </button>
      <button type="button" className={`button element__delete ${!isOwn ? `element__delete_invisible` : ``} `} onClick={handleDelete} aria-label="Удалить место" />
      <div className="element__caption">
        <h3 className="block element__text">{card.name}</h3>
        <div className="like">
          <button type="button" className={`like__button ${isLiked ? 'like__button_checked' : ''}`} onClick={handleLike} aria-label="Поставить лайк" />
          <p className="like__count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;