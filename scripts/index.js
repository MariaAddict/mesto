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

import initialCards from './initial-сards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// добавление карточек
function createCard(data) {
  const item = new Card(data);
  return item.generateCard(data);
}

initialCards.forEach((data) => {
  cardsList.append(createCard(data));
});

function addCard(data) {
  cardsList.prepend(createCard(data));
}
//

//валидация и объект классов 
const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__item',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__item_type_error',
  errorClass: 'modal__error_visible',
};

const formValid = new FormValidator(validationConfig);
formValid.enableValidation();
//

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('modal_opened')) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalEsc);
  document.addEventListener('click', closeByOverlay);
}

function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeModalEsc);
  document.removeEventListener('click', closeByOverlay);
}

function closeModalEsc(evt) {
  const modals = Array.from(document.querySelectorAll('.modal'));
  if (evt.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.classList.contains('modal_opened')) {
        closeModal(modal);
      }
    });
  }
}

function saveProfileChanges(event) {
  event.preventDefault();
  nameProfile.textContent = editModalInputName.value;
  activityProfile.textContent = editModalInputActivity.value;
  closeModal(modalEditProfile);
}

openModalEditButton.addEventListener('click', () => {
  openModal(modalEditProfile);
  editModalInputName.value = nameProfile.textContent;
  editModalInputActivity.value = activityProfile.textContent;
  formValid.clearInputErrorCheckButton(formEditProfile);
});

openModalAddButton.addEventListener('click', () => {
  openModal(modalAddCard);
  formAddCard.reset();
  formValid.clearInputErrorCheckButton(formAddCard);
});

closeModalEditButton.addEventListener('click', () => { closeModal(modalEditProfile); });
closeModalAddButton.addEventListener('click', () => { closeModal(modalAddCard); });
closeModalImageButton.addEventListener('click', () => {
  closeModal(modalImage);
  figureImgModal.src = '';
  figureImgModal.alt = '';
  captionImgModal.textContent = '';
});

formEditProfile.addEventListener('submit', (evt) => { saveProfileChanges(evt); });
formAddCard.addEventListener('submit', (event) => {
  event.preventDefault();
  headerImage.textContent = '';
  urlImage.textContent = '';
  addCard({ name: headerImage.value, link: urlImage.value });
  closeModal(modalAddCard);
});