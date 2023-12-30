import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick, onCardDelete, onCardLike })
{
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser.avatar);
  console.log(currentUser.name);
  console.log(currentUser.about);

  return (
    <main>
      
      <section className="profile">
        <div className="avatar">
          <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="avatar__image" />
          <button type="button" className="button avatar__button" aria-label="Редактировать аватар" onClick={onEditAvatarClick}>
            <div className="avatar__pen" />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="block profile__name">{currentUser.name}</h1>
          <button type="button" className="button profile__edit" aria-label="Редактировать профиль" onClick={onEditProfileClick} />
          <p className="block profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="button profile__add" aria-label="Добавить место" onClick={onAddPlaceClick} />
      </section>

      <section className="elements" aria-label="Место для фотографий">
        {
          cards.map((item) =>
          {
            return (<Card
              card={item}
              key={item._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />)
          })
        }
      </section>

    </main>
  );
}

export default Main;