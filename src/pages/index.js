import './index.css';
import initialCards from '../utils/initial-сards.js';
import {
  formEditProfile, formAddCard, openModalEditButton, openModalAddButton, nameProfile,
  activityProfile, cardTemplateSelector, cardContainerSelector
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//попап картинки
const popupImage = new PopupWithImage({name: "", link: "#"}, '.modal_type_figure');
//
function createCard(data){
  const card = new Card(data, cardTemplateSelector, {
    handleCardClick: (cardItem) => {
      console.log(cardItem);
      popupImage.open(cardItem);
    }
  });
  return card;
}


// добавление карточек
const cardItemList = new Section({
  items: initialCards, renderer: (data) => {
    const card = createCard(data);
    const cardElement = card.generateCard(data);
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
const addForm = new PopupWithForm({
  popupSelector: '.modal_type_add',
  saveFormData: (data) => {
    const card = createCard(data);
    const cardElement = card.generateCard();
    cardItemList.addItem(cardElement);
    addForm.close();
  }
});

//создание класса информации профиля
const user = new UserInfo({name: nameProfile, activity: activityProfile});

// добавление формы "Редактировать профиль"
const editForm = new PopupWithForm({
  popupSelector: '.modal_type_edit',
  saveFormData: (item) => {
    user.setUserInfo(item);
    editForm.close();
  }
});

//слушатели
addForm.setEventListeners();
editForm.setEventListeners();
popupImage.setEventListeners();

//кнопки открытия модалок
openModalEditButton.addEventListener('click', () => {
  editForm.open();
  const dataUser = user.getUserInfo();
  formEditProfile.querySelectorAll('.modal__item').forEach(input => {
    input.value = dataUser[input.name];
  });
  formEditProfileForValidation.clearInputErrorCheckButton();
});

openModalAddButton.addEventListener('click', () => {
  addForm.open();
  formAddCardForValidation.clearInputErrorCheckButton();
});