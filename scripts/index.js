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
const modalImage = document.querySelector('.modal_type_figure');
let formEdit = modalEdit.querySelector('.modal__form');
let formAdd = modalAdd.querySelector('.modal__form');
let openModalEditButton = document.querySelector('.profile__info-button');
let openModalAddButton = document.querySelector('.profile__add-button');
let closeModalEditButton = modalEdit.querySelector('.modal__close-button');
let closeModalAddButton = modalAdd.querySelector('.modal__close-button');
const closeModalImageButton = modalImage.querySelector('.modal__close-button');
let nameProfile = document.querySelector('.profile__name');

let activityProfile = document.querySelector('.profile__activity-type');
let editName = document.querySelector('.modal__item_type_name');
let editActivity = document.querySelector('.modal__item_type_activity-type');
let headerImage = formAdd.querySelector('.modal__item_type_header-image');
let urlImage = formAdd.querySelector('.modal__item_type_url-image');
let figureImgModal =  modalImage.querySelector('.modal__image');
let captionImgModal = modalImage.querySelector('.modal__caption');

const cardsList = document.querySelector('.cards');

const cardTemplate = document.querySelector('.card-template').content.querySelector('.cards__item');



const toggleModal = (modal) => {
  modal.classList.toggle('modal_opened');
};

function editInput () {
  event.preventDefault();
  nameProfile.textContent = editName.value;
  activityProfile.textContent = editActivity.value;
  toggleModal(modalEdit);
};

function createCard(card) {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector('.cards__image');
  const cardTitle = cardItem.querySelector('.cards__title');
  const cardLikeButton = cardItem.querySelector('.cards__like');
  const cardDeleteButton = cardItem.querySelector('.cards__delete');
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardDeleteButton.addEventListener('click', (event) => {
    event.target.closest('.cards__item').remove();
  });

  cardLikeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__like_pressed');
  })

  
  cardImage.addEventListener('click', (event) => {
    figureImgModal.src = card.link;
    figureImgModal.alt = card.name;
    captionImgModal.textContent = card.name;
    toggleModal(modalImage);
  })

  return cardItem;
};

function renderCard(card) {
  cardsList.prepend(createCard(card));
};

function addCard() {
  event.preventDefault();
  renderCard({name: headerImage.value, link: urlImage.value});
  toggleModal(modalAdd);
};

openModalEditButton.addEventListener('click', () => { 
  toggleModal(modalEdit);
  editName.value = nameProfile.textContent;
  editActivity.value = activityProfile.textContent;
 });
openModalAddButton.addEventListener('click', () => { 
  toggleModal(modalAdd); 
  headerImage.value = '';
  urlImage.value = '';
});
closeModalEditButton.addEventListener('click',  () => { toggleModal(modalEdit); });
closeModalAddButton.addEventListener('click',  () => { toggleModal(modalAdd); });
closeModalImageButton.addEventListener('click',  () => { 
  toggleModal(modalImage);
  figureImgModal.src = "";
  figureImgModal.alt = "";
  captionImgModal.textContent = "";
});
formEdit.addEventListener('submit', () => { editInput(modalEdit); });

initialCards.forEach((data) => {
  renderCard(data);
});



formAdd.addEventListener('submit', () => { 
  event.preventDefault();
  headerImage.textContent = '';
  urlImage.textContent = '';
  addCard(); 
});
