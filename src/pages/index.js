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
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-15/', {
    headers: {
        'Content-Type': 'application/json',
        authorization: 'e7e08b6b-adf3-43f0-9ed1-13df27223916'
    }
});

api.getAppInfo().then(([cards, userInfoData]) => {

    //создание класса информации профиля
    api.getUserInfo().then(dataUser => {
        nameProfile.textContent = dataUser.name;
        activityProfile.textContent = dataUser.about;
        imageProfile.src = dataUser.avatar;
    }).catch(err => {
        console.log(err);
    });

    const user = new UserInfo({ name: nameProfile, activity: activityProfile });

    //попап картинки
    const popupImage = new PopupWithImage('.modal_type_figure');
    //попап подтверждения удаления карточки
    const popupCheck = new PopupWithFormSubmit({
        popupSelector: '.modal_type_check',
        checkForm: (id, card) => {
            api.deleteCard(id).then(() => {
                popupCheck.close();
                card.remove();
            }).catch(err => {
                console.log(err);
            });
        }
    });
    //

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
            handleLikeClick: (card) => {
                const likebutton = card.querySelector('.cards__like');
                if (likebutton.classList.contains('card__like_pressed')) {
                    api.addLike(data._id).then(card => {
                        return card.likes.length;
                    }).then(length => {
                        card.querySelector('.cards__number-of-likes').textContent = length;
                    }).catch(err => {
                        console.log(err);
                    });;
                } else {
                    api.deleteLike(data._id).then(card => {
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
        const cardElement = card.generateCard(userInfoData._id);
        return cardElement;
    }

    // добавление карточек
    const cardItemList = new Section({
        renderer: (data) => {
            const cardElement = createCard(data);
            cardItemList.setItem(cardElement);
        }
    }, cardContainerSelector);

    api.getInitialCards().then(cards => {
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
                addForm.close();
                return cardItemList.addItem(cardElement);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                modalAddCard.querySelector('.modal__name-button').innerHTML = 'Создание...';
            });
        }
    });

    // добавление формы "Редактировать профиль"
    const editForm = new PopupWithForm({
        popupSelector: '.modal_type_edit',
        saveFormData: (item) => {
            api.editUserInfo(item).then(data => {
                user.setUserInfo(data);
                editForm.close();
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                modalEditProfile.querySelector('.modal__name-button').innerHTML = 'Сохранение...';
            });
        }
    });

    //создание попапа "Обновить аватар"
    const popupAvatar = new PopupWithForm({
        popupSelector: '.modal_type_avatar',
        saveFormData: (input) => {
            api.changeAvatar(input).then(() => {
                document.querySelector('.profile__image').src = input.link;
                popupAvatar.close();
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                document.querySelector('.modal_type_avatar').querySelector('.modal__name-button').innerHTML = 'Сохранение...';
            });
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

    // конец
}
).catch(err => {
    console.log(err);
});