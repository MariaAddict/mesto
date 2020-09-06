import { nameProfile, activityProfile } from '../utils/constants.js'

export default class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._activity = data.activity;
    }

    getUserInfo() {
        this._inputs = document.querySelector('.modal_type_edit').querySelectorAll('.modal__item');
        this._inputs[0].value = nameProfile.textContent;
        this._inputs[1].value = activityProfile.textContent;
        return this._inputs;
    }

    setUserInfo() {
        nameProfile.textContent = this._name;
        activityProfile.textContent = this._activity;
    }
}