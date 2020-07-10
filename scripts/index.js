let openModalButton = document.querySelector('.profile__info-button');
let modal = document.querySelector('.modal');
let closeModalButton = document.querySelector('.modal__close-button');
let nameProfile = document.querySelector('.profile__name');
let activityProfile = document.querySelector('.profile__activity-type');
let editName = document.querySelector('.modal__item_name_name');
let editActivity = document.querySelector('.modal__item_name_activity-type');
let form = modal.querySelector('.modal__form');

function toggleButton () {
    modal.classList.toggle('modal_opened');
    if (modal.classList.contains('modal_opened') === true) {
    editName.value = nameProfile.textContent;
    editActivity.value = activityProfile.textContent;
}
}

function editInput () {
    event.preventDefault();
    nameProfile.textContent = editName.value;
    activityProfile.textContent = editActivity.value;
    toggleButton ();
}

openModalButton.addEventListener('click', toggleButton);
closeModalButton.addEventListener('click', toggleButton);
form.addEventListener('submit', editInput);