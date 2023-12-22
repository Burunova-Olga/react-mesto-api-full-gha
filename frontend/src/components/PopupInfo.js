import React from 'react';
import infoOk from '../images/info-ok.svg';
import infoError from '../images/info-error.svg';
import Popup from './Popup';

function PopupInfo({isOpen, onClose, isOk})
{  
  return (
    <Popup 
    name = "info"
    isOpen={isOpen}
    onClose={onClose}>
      <div style={{ backgroundImage: isOk ? `url(${infoOk})` : `url(${infoError})`}} className="info__image" />
      <p className="info__text">{`${isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</p>
    </Popup>
  ); 
}

export default PopupInfo;