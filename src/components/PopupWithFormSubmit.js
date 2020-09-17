import Popup from './Popup.js';

export default class PopupWithFormSubmit extends Popup {
    constructor({popupSelector, checkForm}) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._checkForm = () => {
            checkForm(this._id);
        }
    }

    open(id) {
        super.open();
        this._id = id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.modal__form').addEventListener('submit', this._checkForm);
    }
}