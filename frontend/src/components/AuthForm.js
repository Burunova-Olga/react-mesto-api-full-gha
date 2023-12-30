import React from 'react';
import useForm from "../hooks/UseForm";

function AuthForm({title, submmitText, onSubmit, children})
{ 
  const {formValues, handleChange, setFormValues} = useForm ({ email: '', password: ''});
 
  const handleSubmit = (e) =>
  {
    e.preventDefault();

    if (!formValues.email || !formValues.password)    
      return;

    console.log(formValues.email);
    onSubmit(formValues.email, formValues.password);    
  }

  return (
    <div className="welcome">
        <p className="welcome__title"> {title} </p>
        <form onSubmit={handleSubmit} >
          <input type="email" className="welcome__input" name="email" id="input-email"
            placeholder="Email" value={formValues.email} onChange={handleChange} required />

          <input type="password" className="welcome__input" name="password" id="input-password"
            placeholder='Пароль' value={formValues.password} onChange={handleChange} required/>

          <input type="submit" className="welcome__submit" value={submmitText} />
        </form>
        
        {children}          
    </div>
  );
}

export default AuthForm;