import React from 'react';

import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Avatar from '../images/profile-image.jpg';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import PopupImageZoom from './PopupImageZoom';
import PopupDeletePlace from './PopupDeletePlace';

function Basis({email, signOut})
{
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = React.useState(false);
  const [isPopupEditProfileOpen, setIsPopupEditProfileOpen] = React.useState(false);
  const [isPopupAddPlaceOpen, setIsPopupAddPlaceOpen] = React.useState(false);
  const [isPopupImageZoomOpen, setIsPopupImageZoomOpen] = React.useState(false); 

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  const [currentUser, setCurrentUser] = React.useState(
    {
      name: 'Жак-Ив Кусто',
      about: 'Исследователь океана',
      avatar: { Avatar }
    });
  
  React.useEffect(() =>
  {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) =>
      {
        setCurrentUser(userData.message);
        const cardsReverse = cardsData.reverse();
        setCards(cardsReverse);
      })
      .catch(console.error);
  }, []);

  // Уходя - гасите свет
  function closeAllPopups()
  {
    setIsPopupEditAvatarOpen(false);
    setIsPopupEditProfileOpen(false);
    setIsPopupAddPlaceOpen(false);
    setIsPopupImageZoomOpen(false);

    setSelectedCard({ name: '', link: '' });
  }

  //----------------------------------------------------
  //                    Картинки
  //----------------------------------------------------

  // Открытие картинки на полный экран
  function handleCardClick(card)
  {
    setSelectedCard(card);
    setIsPopupImageZoomOpen(true);
  }

  // Добавление новой фотографии
  function handleAddPlaceClick()
  {
    setIsPopupAddPlaceOpen(true);
  }

  // Добавление картинки
  function handleAddPlace(description, link)
  {
    api.addNewCard(description, link)
      .then((card) =>
      {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // Постановка лайка
  function handleCardLike(card)
  {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked)
      .then((newCard) =>
      {
        setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      })
      .catch(console.error);
  }

  // Удаление картинки
  function handleCardDelete(card)
  {
    api.deleteCard(card._id)
      .then(() =>
      {
        setCards((state) => state.filter((oldCard) => oldCard._id !== card._id));
      })
      .catch(console.error);
  }
  //----------------------------------------------------
  //                    Аватар
  //----------------------------------------------------

  // Изменение аватара
  function handleEditAvatarClick()
  {
    setIsPopupEditAvatarOpen(true);
  }

  function handleEditAvatar(link)
  {    
    api.setUserAvatar(link)
      .then((result) =>
      {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(console.error);
  }

  //----------------------------------------------------
  //                    Профиль
  //----------------------------------------------------
  // Изменение профиля
  function handleEditProfileClick()
  {
    setIsPopupEditProfileOpen(true);
  }

  function handleEditProfile(name, about)
  {    
    api.setUserInfo(name, about)
      .then((result) =>
      {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(console.error);
  }

  //----------------------------------------------------
  //                    Страница
  //----------------------------------------------------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <div className="header__menu">
          <div className="header__username">{email}</div>
          <button onClick={signOut} className="header__button button">Выйти</button>
        </div>
      </Header>
      <Main
        cards={cards}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
      />
      <Footer />

      <PopupEditProfile
        isOpen={isPopupEditProfileOpen}
        onClose={closeAllPopups}
        onEditProfile={handleEditProfile}
      />
      <PopupEditAvatar
        isOpen={isPopupEditAvatarOpen}
        onClose={closeAllPopups}
        onEditAvatar={handleEditAvatar}
      />
      <PopupAddPlace
        isOpen={isPopupAddPlaceOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <PopupDeletePlace
        isOpen={false}
        onClose={closeAllPopups}
      />
      <PopupImageZoom
        isOpen={isPopupImageZoomOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default Basis;
