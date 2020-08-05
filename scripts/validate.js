/* formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass */
const enableValidation = ({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass);
    });    
 }

  function setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass) {
      const inputList = formElement.querySelectorAll(inputSelector);
      const submitButton = formElement.querySelector(submitButtonSelector);
      inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            
            if (!inputElement.validity.valid) {
                inputElement.classList.add(inputErrorClass);
                hideInputError(formElement, inputElement)
            } else {
                inputElement.classList.remove(inputErrorClass);
            }
        });
      });
  }

  function hideInputError(formElement, inputElement) {
      const errorElement = formElement.querySelector(`#`);
  }

  enableValidation({
    formSelector: '.modal__form',
    inputSelector: '.modal__item',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__error_visible'
  });