export default class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._activity = data.activity;
    }

    getUserInfo() {
        this._user = {name: this._name.textContent, activity: this._activity.textContent};
        return this._user;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._activity.textContent = data.about;
    }
}