//для слушателя картинки
const modalImage = document.querySelector('.modal_type_figure');
const figureImgModal = modalImage.querySelector('.modal__image');
const captionImgModal = modalImage.querySelector('.modal__caption');

import {closeByOverlay, openModal, closeModal, closeModalEsc} from './utils.js';

export default class Card {
    constructor(data, selectorClass) {
        this._image = data.link;
        this._title = data.name;
        this._selectorClass = selectorClass;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._selectorClass).content.querySelector('.cards__item'); '.card-template'
        const cardItem = cardTemplate.cloneNode(true);
        return cardItem;
    }

    _removeCard = () => {
        this._card.remove();
    }

    _setEventListeners() {
        this._card.querySelector('.cards__like').addEventListener('click', (event) => {
            event.target.classList.toggle('card__like_pressed');
        });
        this._card.querySelector('.cards__delete').addEventListener('click', this._removeCard);
        this._cardImage.addEventListener('click', () => {
            openModal(modalImage);
            figureImgModal.src = this._image;
            figureImgModal.alt = this._title;
            captionImgModal.textContent = this._title;
        });
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.cards__image');
        this._setEventListeners();

        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._card.querySelector('.cards__title').textContent = this._title;

        return this._card;
    }
}