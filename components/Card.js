export default class Card {
    constructor(data, cardSelector, {handleCardClick}) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = () => {
            handleCardClick({name: this._cardTitle.textContent, link: this._cardImage.src});
        }
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.cards__item'); '.card-template'
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