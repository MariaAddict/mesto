export default class Api {
    constructor(url, {headers}) {
        this._url = url;
        this._headers = headers;
    }

    getInitialCard() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => { return res.json(); })
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
            return res.json(); })
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => { 
        return res.json();})
        
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(res => { return res.json(); })
    }

    editUserInfo(userInfo) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.activity
            })
        }).then(res => { return res.json(); })
    }

    getAppInfo() {
        return Promise.all([this.getInitialCard(), this.getUserInfo()]);
    }
}
