class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('error');
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRequest);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRequest);
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkRequest);
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkRequest);
  }

  postUserCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkRequest);
  }

  addLike(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkRequest);
  }

  removeLike(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRequest);
  }

  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRequest);
  }
}

const options = {
  link: 'https://lostgeneration.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
    'Origin': 'https://lostgeneration.nomoredomains.work'
  }
}

export const api = new Api(options);
