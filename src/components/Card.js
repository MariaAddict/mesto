export default class Card {
    constructor(data, cardSelector, { handleCardClick }, { handleDeleteClick }) {
        this._title = data.name;
        this._image = data.link;
        this._id = data.id;
        this._cardSelector = cardSelector;
        this._handleCardClick = () => {
            handleCardClick({ name: this._cardTitle.textContent, link: this._cardImage.src });
        }
        this._handleDeleteClick = () => { handleDeleteClick (data._id)};
        // this._removeCard = () => {
        //     this._card.remove();
        // }
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.cards__item');
        '.card-template'
        const cardItem = cardTemplate.cloneNode(true);
        return cardItem;
    }

    _setEventListeners() {
        this._card.querySelector('.cards__like').addEventListener('click', (event) => {
            event.target.classList.toggle('card__like_pressed');
        });
        this._card.querySelector('.cards__delete').addEventListener('click', this._handleDeleteClick);
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.cards__image');
        this._cardTitle = this._card.querySelector('.cards__title');
        this._setEventListeners();

        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;


        return this._card;
    }
}