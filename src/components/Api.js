export default class Api {
    constructor(url, { headers }) {
        this._url = url;
        this._headers = headers;
    }

    getInitialCard() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    addCard(card) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).catch(err => {
            console.log(err);
        });

    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    editUserInfo(userInfo) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.activity
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).catch(err => {
            console.log(err);
        });
    }

    addLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        }
        ).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        });
    }

    deleteLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }
        ).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        });
    }

    // https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar
    // 'https://mesto.nomoreparties.co/v1/cohort-15/'
    changeAvatar(input) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: input.link
            })
        }
        ).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
            .catch(err => {
                console.log(err);
            });
    }
}

