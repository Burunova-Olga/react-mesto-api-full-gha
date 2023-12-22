import React, {useEffect} from 'react';

function Popup({name, isOpen, onClose, isPhoto, children})
{   
  // Esc
  useEffect(() =>
  {
    function closeByEscape(evt)
    {
      if(evt.key === 'Escape')
        onClose();
    }

    if(isOpen)
    { 
      document.addEventListener('keydown', closeByEscape);
      return () => { document.removeEventListener('keydown', closeByEscape); }
    }
  }, [isOpen]) 

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}` }>
      <div className={`popup__container ${isPhoto ? "photo" : ''}`}>
        <div className="close">
          <button type="button" className="button close__button" aria-label="Закрыть без сохранения" onClick={onClose} />
        </div>
        {children}   
      </div>
    </div>
  );
}

export default Popup;