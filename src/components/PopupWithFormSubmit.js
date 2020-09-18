import Popup from './Popup.js';

export default class PopupWithFormSubmit extends Popup {
    constructor({popupSelector, checkForm}) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._checkForm = (evt) => {
            evt.preventDefault();
            checkForm(this._id,this._element);
        }
    }

    open(id, element) {
        super.open();
        this._id = id;
        this._element = element;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.modal__form').addEventListener('submit', this._checkForm);
    }
}