// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.modal__form',
    inputSelector: '.modal__item',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__error_visible'
  });