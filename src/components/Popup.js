export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                if (this._popup.classList.contains('modal_opened')) {
                    this.close();
                }
            }
        }

        this._closeByOverlay = (evt) => {
            if (evt.target.classList.contains('modal_opened')) {
                this.close();
            }
        }
    }

    open() {
        this._popup.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        document.addEventListener('click', this._closeByOverlay);
        this._popup.querySelector('.modal__close-button').addEventListener('click', () => {
            this.close();
        });
    }
}