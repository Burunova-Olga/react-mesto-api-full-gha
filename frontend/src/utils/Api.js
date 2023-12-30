import BaseApi from './BaseApi';

class Api extends BaseApi
{
  getInitialCards()
  {
    return this._request
    ({
      method: 'GET',
      url: "/cards"
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
        })
    })
  }

  changeLike(cardId, isLike)
  {
    const method = isLike ? 'PUT' : 'DELETE';
    return this._request
    ({
      method: method,
      url: `/cards/${cardId}/likes`
    });
  }

  deleteCard(cardId)
  {
    return this._request
    ({
      method: 'DELETE',
      url: `/cards/${cardId}`
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
      url: "/users/me"
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
  baseUrl: 'https://api.niceplace.students.nomoredomainsmonster.ru',  
  headers:
  {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('token')}`
  }
}); 

export default api;
