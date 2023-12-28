import { NavLink, Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import Header from './Header';

function Register({onSubmit})
{
  return (
    <>
      <Header>        
        <NavLink className="header__link link" to="/signin">Войти</NavLink>
      </Header>
      <AuthForm       
        title="Регистрация" 
        submmitText="Зарегистрироваться" 
        onSubmit={onSubmit}  
      >
        <div className="welcome__question">
          <p>Уже зарегистрированы?</p>
          <Link to="/signin" className="welcome__link link">Войти</Link>
        </div>
      </AuthForm>
    </>
  );
}

export default Register;