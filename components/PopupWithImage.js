import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }

    open(){
        this._popup.querySelector('.modal__image').src = this._link;
        this._popup.querySelector('.modal__image').alt = this._name;
        this._popup.querySelector('.modal__caption').textContent = this._name;
        super.open();
    }

}