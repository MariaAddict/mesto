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

openModalEditButton.addEventListener('click', () => { 
  toggleModal(modalEdit);
  editName.value = nameProfile.textContent;
  editActivity.value = activityProfile.textContent;
 });
openModalAddButton.addEventListener('click', () => { toggleModal(modalAdd); });
closeModalEditButton.addEventListener('click',  () => { toggleModal(modalEdit); });
closeModalAddButton.addEventListener('click',  () => { toggleModal(modalAdd); });
formEdit.addEventListener('submit', () => { editInput(modalEdit) });