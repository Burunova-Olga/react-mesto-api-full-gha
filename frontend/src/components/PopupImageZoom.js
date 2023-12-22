import React from 'react';
import Popup from './Popup';

function PopupImageZoom({isOpen, onClose, card})
{  
  return (
    <Popup 
    name = "info"
    isOpen={isOpen}
    isPhoto = {true}
    onClose={onClose}>
      <img className ="photo__image"
        src={card.link}
        alt= {card.name} />
      <p className="photo__text">{(card.name != " ") ? card.name : ''}</p>
    </Popup>
  ); 
}

export default PopupImageZoom;