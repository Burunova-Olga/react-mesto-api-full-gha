import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from "../hooks/UseForm";

function PopupEditProfile({ isOpen, onClose, onEditProfile })
{
  const currentUser = React.useContext(CurrentUserContext);
  const {formValues, handleChange, setFormValues} = useForm ({ name: '', description: ''});  
  const handleEditProfile = () => onEditProfile(formValues.name, formValues.description);

  React.useEffect(() =>
  {
    setFormValues({...formValues, 
      'description': currentUser.about, 
      'name': currentUser.name});
  }, [currentUser, isOpen]);

  function handleSubmit(e)
  {
    e.preventDefault();
    handleEditProfile();
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль" 
      buttonText="Сохранить"       
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <input type="text" className="form-popup__input form-popup__input_type_title" name="name" id="input-name"
        placeholder="Ваше имя" required minLength="2" maxLength="40" onChange={handleChange} value={formValues.name} />
      <span className="form-popup__input-error input-name-error" />

      <input type="text" className="form-popup__input form-popup__input_type_subtitle" name="description"
        id="input-description" placeholder='Краткая информация' required minLength="2" onChange={handleChange}
        maxLength="200" value={formValues.description} />
      <span className="form-popup__input-error input-description-error" />
    </PopupWithForm>
  )
}

export default PopupEditProfile;