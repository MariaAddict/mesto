import './index.css';
import {
    modalEditProfile,
    modalAddCard,
    formEditProfile,
    formAddCard,
    formAvatar,
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

//создание api
let idUser;

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
}).catch(err => {
    console.log(err);
});;


const user = new UserInfo({ name: nameProfile, activity: activityProfile });

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
    if (idUser === data.owner._id) {
        return true;
    } else {
        return false;
    }
}
//проверка на поставленный лайк
function buttonLikebyUser(likes) {
    return likes.some(like => {
        return idUser === like._id;
    });
}

//создание карточки
function createCard(data) {
    const card = new Card(data, cardTemplateSelector, {
        handleCardClick: (cardItem) => {
            popupImage.open(cardItem);
        }
    }, {
        handleDeleteClick: (id, card) => {
            popupCheck.open(id, card);
        }
    }, {
        handleLikeClick: (id, card) => {
            const likebutton = card.querySelector('.cards__like');
            if (likebutton.classList.contains('card__like_pressed')) {
                api.addLike(id).then(card => {
                    return card.likes.length;
                }).then(length => {
                    card.querySelector('.cards__number-of-likes').textContent = length;
                }).catch(err => {
                    console.log(err);
                });;
            } else {
                api.deleteLike(id).then(card => {
                    return card.likes.length;
                }).then(length => {
                    card.querySelector('.cards__number-of-likes').textContent = length;
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
    );
    const havelike = buttonLikebyUser(data.likes);
    const cardElement = card.generateCard(buttonDeletebyUser(data), havelike);
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
}).catch(err => {
    console.log(err);
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
const formAvatarForValidation = new FormValidator(validationConfig, formAvatar);
formAvatarForValidation.enableValidation();
//

// добавление формы "Новое место"
const addForm = new PopupWithForm({
    popupSelector: '.modal_type_add',
    saveFormData: (data) => {
        api.addCard(data).then(card => {
            return createCard(card);
        }).then(cardElement => {
            return cardItemList.addItem(cardElement);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            modalAddCard.querySelector('.modal__name-button').innerHTML = 'Создание...';
        });
        addForm.close();
    }
});

// добавление формы "Редактировать профиль"
const editForm = new PopupWithForm({
    popupSelector: '.modal_type_edit',
    saveFormData: (item) => {
        user.setUserInfo(item);
        api.editUserInfo(item).finally(() => {
            modalEditProfile.querySelector('.modal__name-button').innerHTML = 'Сохранение...';
        });;
        editForm.close();
    }
});

//создание попапа "Обновить аватар"
const popupAvatar = new PopupWithForm({
    popupSelector: '.modal_type_avatar',
    saveFormData: (input) => {
        document.querySelector('.profile__image').src = input.link;
        api.changeAvatar(input).finally(() => {
            document.querySelector('.modal_type_avatar').querySelector('.modal__name-button').innerHTML = 'Сохранение...';
        });
        popupAvatar.close();
    }
});

//слушатели
addForm.setEventListeners();
editForm.setEventListeners();
popupImage.setEventListeners();
popupCheck.setEventListeners();
popupAvatar.setEventListeners();


//кнопки открытия модалок
openModalEditButton.addEventListener('click', () => {
    editForm.open();
    modalEditProfile.querySelector('.modal__name-button').innerHTML = 'Сохранить';
    const dataUser = user.getUserInfo();
    formEditProfile.querySelectorAll('.modal__item').forEach(input => {
        input.value = dataUser[input.name];
    });
    formEditProfileForValidation.clearInputErrorCheckButton();
});

openModalAddButton.addEventListener('click', () => {
    addForm.open();
    modalAddCard.querySelector('.modal__name-button').innerHTML = 'Создать';
    formAddCardForValidation.clearInputErrorCheckButton();
});

document.querySelector('.profile__overlay').addEventListener('click', () => {
    popupAvatar.open();
    document.querySelector('.modal_type_avatar').querySelector('.modal__name-button').innerHTML = 'Сохранить';
    formAvatarForValidation.clearInputErrorCheckButton();
});