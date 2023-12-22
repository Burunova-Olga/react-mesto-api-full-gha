import React from 'react';
import Popup from './Popup';

function PopupWithForm({name, isOpen, title, buttonText, buttonLoadingText, onClose, children, onSubmit})
{   
  return (
    <Popup 
      name = {name}
      isOpen={isOpen}
      onClose={onClose}>      
        <h3 className="popup__title">{title}</h3>
        <form className={`form-popup form-popup_type_${name}`} name={`form-popup_type_${name}`} onSubmit={onSubmit}>
          {children}          
          <input type="submit" className="form-popup__submit" value={buttonText} />
        </form>
    </Popup>
  );
}

export default PopupWithForm;