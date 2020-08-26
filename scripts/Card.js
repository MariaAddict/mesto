//для слушателя картинки
const modalImage = document.querySelector('.modal_type_figure');
const figureImgModal = modalImage.querySelector('.modal__image');
const captionImgModal = modalImage.querySelector('.modal__caption');

import {closeByOverlay, openModal, closeModal, closeModalEsc} from './utils.js';

export default class Card {
    constructor(data, handleCardClick) {
        this._image = data.link;
        this._title = data.name;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector('.card-template').content.querySelector('.cards__item');
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
        this._card.querySelector('.cards__image').addEventListener('click', () => {
            figureImgModal.src = this._image;
            figureImgModal.alt = this._title;
            captionImgModal.textContent = this._title;
            openModal(modalImage);
        });
    }

    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector('.cards__image').src = this._image;
        this._card.querySelector('.cards__image').alt = this._title;
        this._card.querySelector('.cards__title').textContent = this._title;

        return this._card;
    }
}