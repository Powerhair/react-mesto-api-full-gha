class Api {
  constructor( {baseUrl}) {
    this._baseUrl = baseUrl;

    this.__checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(this.__checkResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/cards`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this.__checkResponse);
  }


  postUserCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    .then(this.__checkResponse);
  }


  setUserInfo(userInformaiton) {
   console.log(userInformaiton)
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInformaiton)
    })
      .then(this.__checkResponse);
  }

  getUserAvatar(data) {
    console.log(data)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this.__checkResponse);
  }


  removeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      })
      .then(this.__checkResponse);
  }

  addLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      })
      .then(this.__checkResponse);
  }

  removeLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      })
      .then(this.__checkResponse);
  }
}

export const api = new Api({
baseUrl: 'https://api.lostgeneration.stud.nomoredomains.work'
//  baseUrl: 'http://127.0.0.1:3000',
});