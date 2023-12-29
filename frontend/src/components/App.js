import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Basis from './Basis';
import PopupInfo from './PopupInfo';

import ProtectedRouteElement from "./ProtectedRoute";
import auth from "../utils/Auth";

function App()
{
  const [isPopupInfoOpen, setIsPopupInfoOpen] = React.useState(false);
  const [isRegistrSuccess, setIsRegistrSuccess] = React.useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);

  const navigate = useNavigate();

  function setLogin(isLogin, userName)
  {
    setLoggedIn(isLogin);
    setUserName(userName);
  }

  // Регистрация
  function signCreate(email, password)
  {
    auth.register(email, password)
      .then((res) =>
      {
        console.log(res);
        showPopupInfo(!res.error);
        if (!res.error)
          navigate('/signin', {replace: true}); 
      })
      .catch((err) => 
      {
        showPopupInfo(false);
        console.log(err);
      });
  }

  // Авторизация
  function signIn(email, password)
  {
    auth.authorize(email, password)
      .then((data) =>
      {
        if (data.token)
        {
          setLogin(true, email);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => 
      {
        showPopupInfo(false);
        console.log(err);
      });
  }  

  // Разавторизация
  function signOut()
  {
    localStorage.removeItem('token');   
    localStorage.removeItem('username'); 
    localStorage.removeItem('userInfo');    
    setLogin(false, '');
    navigate("/signin");
  }

  // Вывести информацию о результате попытки регистрации
  function showPopupInfo(isSuccess)
  {
    setIsRegistrSuccess(isSuccess);
    setIsPopupInfoOpen(true);
  }

  // Закрыть информационный попап
  function closePopupInfo()
  {    
    setIsPopupInfoOpen(false);
  }

  // Проверка на авторизованного пользователя
  useEffect(() =>
  {
    if (localStorage.getItem('token'))
    {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) =>
        {     
          if (res)
          {
            setLogin(true, localStorage.getItem('username'));
            navigate("/", {replace: true})
          }
        })
        .catch(console.error);
    }
  }, [localStorage.getItem('token')])

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRouteElement element={Basis} loggedIn={loggedIn} email={userName} signOut={signOut}/>} />
        <Route path="/signup" element={<Register onSubmit={signCreate} />} />
        <Route path="/signin" element={<Login onSubmit={signIn} />} />
      </Routes>
    
      <PopupInfo
        isOpen={isPopupInfoOpen}
        onClose={closePopupInfo}
        isOk={isRegistrSuccess}
      />
    </>
  );
}

export default App;