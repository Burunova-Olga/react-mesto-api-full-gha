import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from "../hooks/UseForm";

function PopupAddPlace({ isOpen, onClose, onAddPlace })
{  
  const {formValues, handleChange, setFormValues} = useForm ({ link: '', description: ''});
 
  React.useEffect(() =>
  {
    setFormValues({...formValues, 
      'link': '',
      'description': ''});
  }, [isOpen]);

  function handleSubmit(e)
  {
    e.preventDefault();
    onAddPlace(formValues.description, formValues.link);
  }
  
  return (
    <PopupWithForm 
      name="places" 
      title="Новое место" 
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" className="form-popup__input form-popup__input_type_title" name="description" id="input-place"
        placeholder="Название" required minLength="2" maxLength="30" value={formValues.description} onChange={handleChange} />
      <span className="form-popup__input-error input-place-error" />

      <input type="url" className="form-popup__input form-popup__input_type_subtitle" name="link" id="input-link"
        placeholder='Ссылка на картинку' required value={formValues.link} onChange={handleChange} />
      <span className="form-popup__input-error input-link-error" />
    </PopupWithForm>
  )
}

export default PopupAddPlace;