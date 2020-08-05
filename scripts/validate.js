/* formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass */
const enableValidation = ({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass);
    });    
 }

  function setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass) {
      const inputList = formElement.querySelectorAll(inputSelector);
      const submitButton = formElement.querySelector(submitButtonSelector);
      inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            if (!inputElement.validity.valid) {
                showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);   
            } else {
                hideInputError(formElement, inputElement, inputErrorClass);
            }
        });
      });
  }

  function hideInputError(formElement, inputElement, inputErrorClass) {    
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(errorClass);
  }

  function showInputError(formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(errorClass);
  }

  enableValidation({
    formSelector: '.modal__form',
    inputSelector: '.modal__item',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__error_visible'
  });