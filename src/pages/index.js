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

// добавление карточек
const cardItemList = new Section({
  items: initialCards, renderer: (data) => {
    const item = new Card(data, cardTemplateSelector, {
      handleCardClick: (cardItem) => {
        const popupImage = new PopupWithImage(cardItem, '.modal_type_figure');
        popupImage.open();
      }
    });
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
const AddForm = new PopupWithForm({
  popupSelector: '.modal_type_add',
  saveFormData: (data) => {
    const card = new Card(data, cardTemplateSelector,
      {
        handleCardClick: (cardItem) => {
          const popupImage = new PopupWithImage(cardItem, '.modal_type_figure');
          popupImage.open();
        }
      });
    const cardElement = card.generateCard();
    cardItemList.addItem(cardElement);
    AddForm.close();
  }
});

//создание класса информации профиля
const user = new UserInfo({name: nameProfile, activity: activityProfile});

// добавление формы "Редактировать профиль"
const EditForm = new PopupWithForm({
  popupSelector: '.modal_type_edit',
  saveFormData: (item) => {
    user.setUserInfo(item);
    EditForm.close();
  }
});

//слушатели
AddForm.setEventListeners();
EditForm.setEventListeners();
popupImage.setEventListeners();

//кнопки открытия модалок
openModalEditButton.addEventListener('click', () => {
  EditForm.open();
  const dataUser = user.getUserInfo();
  formEditProfile.querySelectorAll('.modal__item').forEach(input => {
    input.value = dataUser[input.name];
  });
  formEditProfileForValidation.clearInputErrorCheckButton();
});

openModalAddButton.addEventListener('click', () => {
  AddForm.open();
  formAddCardForValidation.clearInputErrorCheckButton();
});