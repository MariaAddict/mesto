let openModalButton = document.querySelector('.profile__info-button');
let modal = document.querySelector('.modal');
let closeModalButton = document.querySelector('.modal__close-button');
let nameProfile = document.querySelector('.profile__name');
let activityProfile = document.querySelector('.profile__activity-type');
let editName = document.querySelector('.form__item_name_name');
let editActivity = document.querySelector('.form__item_name_activity-type');
let form = modal.querySelector('.form');

editName.value = nameProfile.textContent;
editActivity.value = activityProfile.textContent;

function toggleButton () {
    modal.classList.toggle('modal_opened');
}

openModalButton.addEventListener('click', toggleButton);
closeModalButton.addEventListener('click', toggleButton);

function editInput () {
    nameProfile.textContent = editName.value;
    activityProfile.textContent = editActivity.value;
    event.preventDefault();
}

form.addEventListener('submit', editInput);