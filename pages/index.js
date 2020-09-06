import initialCards from '../utils/initial-сards.js';
import { openModal, closeModal } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const modalEditProfile = document.querySelector('.modal_type_edit');
const modalAddCard = document.querySelector('.modal_type_add');
const modalImage = document.querySelector('.modal_type_figure');

const formEditProfile = modalEditProfile.querySelector('.modal__form');
const formAddCard = modalAddCard.querySelector('.modal__form');

const openModalEditButton = document.querySelector('.profile__info-button');
const openModalAddButton = document.querySelector('.profile__add-button');

const closeModalEditButton = modalEditProfile.querySelector('.modal__close-button');
const closeModalAddButton = modalAddCard.querySelector('.modal__close-button');
const closeModalImageButton = modalImage.querySelector('.modal__close-button');

const nameProfile = document.querySelector('.profile__name');
const activityProfile = document.querySelector('.profile__activity-type');
const editModalInputName = document.querySelector('.modal__item_type_name');
const editModalInputActivity = document.querySelector('.modal__item_type_activity-type');
const headerImage = formAddCard.querySelector('.modal__item_type_header-image');
const urlImage = formAddCard.querySelector('.modal__item_type_url-image');
const figureImgModal = modalImage.querySelector('.modal__image');
const captionImgModal = modalImage.querySelector('.modal__caption');

const cardsList = document.querySelector('.cards');


// добавление карточек
const cardTemplateSelector = '.card-template';
const cardContainerSelector = '.cards';

const cardItemList = new Section({
  items: initialCards, renderer: (data) => {
    const item = new Card(data, cardTemplateSelector, {handleCardClick: (cardItem) => {
      const popupImage = new PopupWithImage(cardItem, '.modal_type_figure');
      popupImage.open();
    }});
    const cardElement = item.generateCard(data);
    cardItemList.setItem(cardElement);
  }
}, cardContainerSelector);

cardItemList.renderItems(initialCards);

//валидация и объект классов 
const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__item',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__item_type_error',
  errorClass: 'modal__error_visible',
};

const formEditProfileForValidation = new FormValidator(validationConfig, formEditProfile);
formEditProfileForValidation.enableValidation();
const formAddCardForValidation = new FormValidator(validationConfig, formAddCard);
formAddCardForValidation.enableValidation();
//



// добавление формы "Новое место"
const AddForm = new PopupWithForm( {popupSelector:'.modal_type_add', 
saveFormData: (data) => {
  const card = new Card( data , cardTemplateSelector,
    {handleCardClick: (cardItem) => {
      {
        const popupImage = new PopupWithImage(cardItem, '.modal_type_figure');
        popupImage.open();
      }
    }});
    const cardElement = card.generateCard();
    cardItemList.addItem(cardElement);
    AddForm.close();
}
});

// добавление формы "Редактировать профиль"
const EditForm = new PopupWithForm({popupSelector: '.modal_type_edit', 
saveFormData: (item) => {
  const user = new UserInfo(item);
  user.setUserInfo();
  EditForm.close();
}
});

openModalEditButton.addEventListener('click', () => {
  EditForm.open();
  const userInfoOpen = new UserInfo(nameProfile.textContent,  activityProfile.textContent);
  userInfoOpen.getUserInfo();
  formEditProfileForValidation.clearInputErrorCheckButton();
});

openModalAddButton.addEventListener('click', () => {
  AddForm.open();
  formAddCardForValidation.clearInputErrorCheckButton();
});

//кнопки закрытия
closeModalEditButton.addEventListener('click', () => {
  EditForm.close();
});
closeModalAddButton.addEventListener('click', () => {
  AddForm.close();
});
closeModalImageButton.addEventListener('click', () => {
  closeModal(modalImage);
  // popupImage.close();
});