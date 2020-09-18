import './index.css';
import {
    formEditProfile,
    formAddCard,
    openModalEditButton,
    openModalAddButton,
    nameProfile,
    activityProfile,
    imageProfile,
    cardTemplateSelector,
    cardContainerSelector
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithFormSubmit from '../components/PopupWithFormSubmit.js';
import UserInfo from '../components/UserInfo.js';
let idUser;
//создание api
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-15/', {
    headers: {
        'Content-Type': 'application/json',
        authorization: 'e7e08b6b-adf3-43f0-9ed1-13df27223916'
    }
});

//создание класса информации профиля
api.getUserInfo().then(dataUser => {
    idUser = dataUser._id;
    nameProfile.textContent = dataUser.name;
    activityProfile.textContent = dataUser.about;
    imageProfile.src = dataUser.avatar;
});


const user = new UserInfo({ name: nameProfile, activity: activityProfile });
function seakCard(id) {
api.getAppInfo().then(([cards, userData]) => {
    cards.forEach(card => {
        console.log(card._id);
        if (id === card._id) {
            card.remove();
        }
    });
});}
//попап картинки
const popupImage = new PopupWithImage('.modal_type_figure');
//попап подтверждения
const popupCheck = new PopupWithFormSubmit({
    popupSelector: '.modal_type_check',
    checkForm: (id, card) => {
        api.deleteCard(id);
        card.remove();
        popupCheck.close();
    }
});
//
//проверка на авторство карточек
function buttonDeletebyUser(data) {
    console.log();
    if (idUser === data.owner._id) {
        return true;
    } else {
        return false;
    }
}

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, {
        handleCardClick: (cardItem) => {
            popupImage.open(cardItem);
        }
    }, {
        handleDeleteClick: (id, card) => {
            popupCheck.open(id, card);
        }
    });
    const cardElement = card.generateCard(buttonDeletebyUser(data));
    return cardElement;
}

// добавление карточек
const cardItemList = new Section({
    renderer: (data) => {
        const cardElement = createCard(data);
        cardItemList.setItem(cardElement);
    }
}, cardContainerSelector);

api.getInitialCard().then(cards => {
    cardItemList.renderItems(cards);
});

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
        api.addCard(data).then(card =>
            {
                return createCard(card);
            }).then(cardElement => {
                return cardItemList.addItem(cardElement);
        });
        addForm.close();
    }
});

// добавление формы "Редактировать профиль"
const editForm = new PopupWithForm({
    popupSelector: '.modal_type_edit',
    saveFormData: (item) => {
        user.setUserInfo(item);
        api.editUserInfo(item);
        editForm.close();
    }
});

//слушатели
addForm.setEventListeners();
editForm.setEventListeners();
popupImage.setEventListeners();
popupCheck.setEventListeners();

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