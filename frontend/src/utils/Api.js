import BaseApi from './BaseApi';

class Api extends BaseApi
{
  getInitialCards()
  {
    return this._request
    ({
      method: 'GET',
      url: "/cards",
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}`}
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
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }

  changeLike(cardId, isLike)
  {
    const method = isLike ? 'PUT' : 'DELETE';
    return this._request
    ({
      method: method,
      url: `/cards/${cardId}/likes`,
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteCard(cardId)
  {
    return this._request
    ({
      method: 'DELETE',
      url: `/cards/${cardId}`,
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
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
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
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
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
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
      moreHeader: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }
}

const api = new Api 
({ 
  baseUrl: 'https://api.niceplace.students.nomoredomainsmonster.ru',  
  headers:
  {
    'Content-Type': 'application/json',
  }
}); 

export default api;
