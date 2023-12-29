import BaseApi from './BaseApi';

class Api extends BaseApi
{
  getInitialCards()
  {
    return this._request
    ({ 
      method: 'GET', 
      url: "/cards",
      headers:
        {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
    });
  }

  addNewCard(name, link)
  {
    return this._request
      ({
        method: 'POST',
        url: "/cards",
        body: JSON.stringify
          ({
            name: name,
            link: link
          }),
        headers:
          {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
      })
  }

  changeLike(cardId, isLike)
  {
    const method = isLike ? 'PUT' : 'DELETE';
    return this._request
    ({ 
      method: method, 
      url: `/cards/${cardId}/likes`,
      headers:
        {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
    });
  }

  deleteCard(cardId)
  {
    return this._request
    ({ 
      method: 'DELETE', 
      url: `/cards/${cardId}`,
      headers:
        {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
    });
  }

  //*********************************************
  //                  User
  //*********************************************
  getUserInfo()
  {
    return this._request
    ({ 
      method: 'GET', 
      url: "/users/me",
      headers:
        {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
    });
  }

  setUserInfo(name, description)
  {
    return this._request
      ({
        method: 'PATCH',
        url: "/users/me",
        body: JSON.stringify
          ({
            name: name,
            about: description
          }),
        headers:
          {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
      })
  }

  setUserAvatar(link)
  {
    return this._request
      ({
        method: 'PATCH',
        url: "/users/me/avatar",
        body: JSON.stringify
          ({
            avatar: link
          }),
        headers:
        {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
  }
}

const api = new Api('https://api.niceplace.students.nomoredomainsmonster.ru');

export default api;
