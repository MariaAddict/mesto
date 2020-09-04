import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        this._title = data.title;
        this._url = data.url;
        this.super(popupSelector);
    }
    openImage(){
        figureImgModal.src = data.url;
        figureImgModal.alt = this._title;
        captionImgModal.textContent = this._title;
        super.open();
    }
    
    super(close);}