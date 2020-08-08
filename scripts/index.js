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

const closeOverlay = () => {
  const modals = Array.from(document.querySelectorAll('.modal'));
  modals.forEach((modal) => {
    modal.addEventListener('click',(evt) => {
      if (evt.target.classList.contains('modal_opened')) {
        evt.target.classList.remove('modal_opened');
      }
    });
  });
};

closeOverlay();

function openModal(modal, form) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(evt) {
  const modals = Array.from(document.querySelectorAll('.modal'));
  if (evt.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.classList.contains('modal_opened')) {
          modal.classList.remove('modal_opened');
        }
      });
  }
}

function editInput(event) {
  event.preventDefault();
  nameProfile.textContent = editModalInputName.value;
  activityProfile.textContent = editModalInputActivity.value;
  closeModal(modalEdit);
}

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
    openModal(modalImage);
  });

  return cardItem;
}

function renderCard(card) {
  cardsList.prepend(createCard(card));
}

function addCard() {
  event.preventDefault();
  renderCard({name: headerImage.value, link: urlImage.value});
  closeModal(modalAdd);
}

initialCards.forEach((data) => {
  renderCard(data);
});

 openModalEditButton.addEventListener('click', () => {
   openModal(modalEdit);
   clearInputError(formEdit);
   editModalInputName.value = nameProfile.textContent;
   editModalInputActivity.value = activityProfile.textContent;
  }); 
 
openModalAddButton.addEventListener('click', () => { 
  openModal(modalAdd);
  clearInputError(formAdd);
  formAdd.reset();
});

closeModalEditButton.addEventListener('click',  () => { closeModal(modalEdit); });
closeModalAddButton.addEventListener('click',  () => { closeModal(modalAdd); });
closeModalImageButton.addEventListener('click',  () => {
  closeModal(modalImage);
  figureImgModal.src = "";
  figureImgModal.alt = "";
  captionImgModal.textContent = "";
});

formEdit.addEventListener('submit', (evt) => { editInput(evt); });
formAdd.addEventListener('submit', (event) => { 
  event.preventDefault();
  headerImage.textContent = '';
  urlImage.textContent = '';
  addCard(); 
});