import Popup from './Popup.js';

//для слушателя картинки
const modalImage = document.querySelector('.modal_type_figure');
const figureImgModal = modalImage.querySelector('.modal__image');
const captionImgModal = modalImage.querySelector('.modal__caption');

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