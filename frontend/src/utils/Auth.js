import BaseApi from './BaseApi';

class Auth extends BaseApi
{
  register(email, password)
  {
    return this._request
      ({
        method: 'POST',
        url: "/signup",
        body: JSON.stringify({ email, password })
      })
      .then((res) =>
      {
        return res;
      })
  };

  authorize(email, password)
  {
    return this._request
      ({
        method: 'POST',
        url: "/signin",
        body: JSON.stringify({ email, password })
      })
      .then((data) =>
      {
        if (data.token)
        {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', email);
          return data;
        }
        else
          console.log(data.message);
      })
  };

  checkToken(request)
  {
    return this._request
      ({
        method: 'GET',
        url: "/users/me",
        headers: { 'Authorization': `Bearer ${request}` },
      })
      .then(data => data)
  }
}

const auth = new Auth 
({ 
  baseUrl: 'https://api.niceplace.students.nomoredomainsmonster.ru',   
  headers:
  {
    'Content-Type': 'application/json'
  }
}); 

export default auth;