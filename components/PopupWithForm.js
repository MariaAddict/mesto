import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
    constructor( {popupSelector, saveFormData }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.modal__form');
        this._saveFormData = (evt) => {
            evt.preventDefault();
            saveFormData(this._getInputValues());
        }
    }
    open() {
        super.open();
        this.setEventListeners();
    }

    _getInputValues() {
        this._inputs = this._popup.querySelectorAll('.modal__item');
        this._formValues = {};
        this._inputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._saveFormData);
    }

    close() {
        this._form.reset();
        super.close();
    }

}