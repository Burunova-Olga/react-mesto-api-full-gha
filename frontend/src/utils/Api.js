import BaseApi from './BaseApi';

class Api extends BaseApi
{
  getInitialCards()
  {
    return this._request({ method: 'GET', url: "/cards" });
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
          })
      })
  }

  changeLike(cardId, isLike)
  {
    const method = isLike ? 'PUT' : 'DELETE';
    return this._request({ method: method, url: `/cards/${cardId}/likes` });
  }

  deleteCard(cardId)
  {
    return this._request({ method: 'DELETE', url: `/cards/${cardId}` });
  }

  //*********************************************
  //                  User
  //*********************************************
  getUserInfo()
  {
    return this._request({ method: 'GET', url: "/users/me" });
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
          })
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
          })
      })
  }
}

const api = new Api
  ({
    baseUrl: 'http://api.niceplace.students.nomoredomainsmonster.ru',
    headers:
    {
      authorization: localStorage.getItem('jwt'),
      'Content-Type': 'application/json'
    }
  });

export default api;
