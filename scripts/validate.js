const enableValidation = ({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass);
    });    
 }

  function setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const submitButton = formElement.querySelector(submitButtonSelector);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
      inputList.forEach(inputElement => {
        inputElement.addEventListener('input', function () {
            hasInvalidInput(inputList);
            checkInvavidInput (formElement, inputElement, errorClass, inputErrorClass);
            toggleButtonState(inputList, submitButton, inactiveButtonClass);
        });
      });
  }

  function checkInvavidInput (formElement, inputElement, errorClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);   
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  }

  function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {    
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

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
  }

  function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
  }

  enableValidation({
    formSelector: '.modal__form',
    inputSelector: '.modal__item',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__error_visible'
  });