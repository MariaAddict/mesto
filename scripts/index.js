const modal = document.querySelector('.modal');
const modalEdit = document.querySelector('.modal_type_edit');
const modalAdd = document.querySelector('.modal_type_add');
const modalImage = document.querySelector('.modal_type_figure');

const formEdit = modalEdit.querySelector('.modal__form');
const formAdd = modalAdd.querySelector('.modal__form');

const openModalEditButton = document.querySelector('.profile__info-button');
const openModalAddButton = document.querySelector('.profile__add-button');

const closeModalEditButton = modalEdit.querySelector('.modal__close-button');
const closeModalAddButton = modalAdd.querySelector('.modal__close-button');
const closeModalImageButton = modalImage.querySelector('.modal__close-button');

const nameProfile = document.querySelector('.profile__name');
const activityProfile = document.querySelector('.profile__activity-type');
const editModalInputName = document.querySelector('.modal__item_type_name');
const editModalInputActivity = document.querySelector('.modal__item_type_activity-type');
const headerImage = formAdd.querySelector('.modal__item_type_header-image');
const urlImage = formAdd.querySelector('.modal__item_type_url-image');
const figureImgModal =  modalImage.querySelector('.modal__image');
const captionImgModal = modalImage.querySelector('.modal__caption');

const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.cards__item');

const toggleModal = (modal) => {
  modal.classList.toggle('modal_opened');
};

function editInput () {
  event.preventDefault();
  nameProfile.textContent = editModalInputName.value;
  activityProfile.textContent = editModalInputActivity.value;
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

initialCards.forEach((data) => {
  renderCard(data);
});

openModalEditButton.addEventListener('click', () => { 
  toggleModal(modalEdit);
  editModalInputName.value = nameProfile.textContent;
  editModalInputActivity.value = activityProfile.textContent;
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
formAdd.addEventListener('submit', () => { 
  event.preventDefault();
  headerImage.textContent = '';
  urlImage.textContent = '';
  addCard(); 
});