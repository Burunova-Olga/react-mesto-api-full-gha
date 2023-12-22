import { NavLink} from 'react-router-dom';
import AuthForm from './AuthForm';
import Header from './Header';

function Login ({onSubmit})
{  
  return (
    <>
      <Header>        
        <NavLink className="header__link link" to="/sign-up">Регистрация</NavLink>
      </Header>
      <AuthForm 
        title="Вход" 
        submmitText="Войти" 
        onSubmit={onSubmit}        
      />
    </>
  )
}

export default Login;