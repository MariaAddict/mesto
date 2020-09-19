export default class Card {
    constructor(data, cardSelector, { handleCardClick }, { handleDeleteClick }, { handleLikeClick }) {
        this._title = data.name;
        this._image = data.link;
        this._idCard = data._id;
        this._idOwner = data.owner._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = () => {
            handleCardClick({ name: this._cardTitle.textContent, link: this._cardImage.src });
        }
        this._handleDeleteClick = () => { handleDeleteClick(data._id, this._card ); };
        this._handleLikeClick = (evt) => {
            evt.target.classList.toggle('card__like_pressed');
            handleLikeClick(this._card)
        };
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.cards__item');
        const cardItem = cardTemplate.cloneNode(true);
        return cardItem;
    }

    _setEventListeners() {
        this._card.querySelector('.cards__like').addEventListener('click', this._handleLikeClick);
        this._card.querySelector('.cards__delete').addEventListener('click', this._handleDeleteClick);
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    _haveLike(idUser) {
        return this._likes.some(like => {
            return idUser === like._id;
        });
    }

    generateCard(idUser) {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.cards__image');
        this._cardTitle = this._card.querySelector('.cards__title');
        this._likeButton = this._card.querySelector('.cards__like');
        this._numberOfLikes = this._card.querySelector('.cards__number-of-likes');
        this._setEventListeners();

        if ( !(this._idOwner === idUser)) {
            this._card.querySelector('.cards__delete').style.visibility = 'hidden';
        }

        if (this._haveLike(idUser) === true) {
            this._likeButton.classList.add('card__like_pressed');
        } else {
            this._likeButton.classList.remove('card__like_pressed');
        }

        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._numberOfLikes.textContent = this._likes.length;


        return this._card;
    }
}