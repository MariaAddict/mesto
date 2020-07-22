const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let modal = document.querySelector('.modal');
let modalEdit = document.querySelector('.modal_type_edit');
let modalAdd = document.querySelector('.modal_type_add');
let formEdit = modalEdit.querySelector('.modal__form');
let formAdd = modalAdd.querySelector('.modal__form');
let openModalEditButton = document.querySelector('.profile__info-button');
let openModalAddButton = document.querySelector('.profile__add-button');
let closeModalEditButton = modalEdit.querySelector('.modal__close-button');
let closeModalAddButton = modalAdd.querySelector('.modal__close-button');
let nameProfile = document.querySelector('.profile__name');
let activityProfile = document.querySelector('.profile__activity-type');
let editName = document.querySelector('.modal__item_name_name');
let editActivity = document.querySelector('.modal__item_name_activity-type');

const toggleModal = (modal) => {
  modal.classList.toggle('modal_opened');
};

function editInput () {
  event.preventDefault();
  nameProfile.textContent = editName.value;
  activityProfile.textContent = editActivity.value;
  toggleModal(modalEdit);
}

const cardTemplate = document.querySelector('.card-template').content.querySelector('.cards__item');

initialCards.forEach((data) => {
  
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector('.cards__image');
  const cardTitle = cardItem.querySelector('.cards__title');
  const cardLikeButton = cardItem.querySelector('.cards__like');
  const cardDeleteButton = cardItem.querySelector('.cards__delete');
  const cardsList = document.querySelector('.cards');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardsList.append(cardItem);
});

openModalEditButton.addEventListener('click', () => { 
  toggleModal(modalEdit);
  editName.value = nameProfile.textContent;
  editActivity.value = activityProfile.textContent;
 });
openModalAddButton.addEventListener('click', () => { toggleModal(modalAdd); });
closeModalEditButton.addEventListener('click',  () => { toggleModal(modalEdit); });
closeModalAddButton.addEventListener('click',  () => { toggleModal(modalAdd); });
formEdit.addEventListener('submit', () => { editInput(modalEdit) });