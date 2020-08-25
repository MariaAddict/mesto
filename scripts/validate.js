// const enableValidation = ({
//   formSelector,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass,
// }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(
//       formElement,
//       inputSelector,
//       submitButtonSelector,
//       inputErrorClass,
//       errorClass,
//       inactiveButtonClass
//     );
//   });
// };

// function setEventListeners(
//   formElement,
//   inputSelector,
//   submitButtonSelector,
//   inputErrorClass,
//   errorClass,
//   inactiveButtonClass
// ) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const submitButton = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, submitButton, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       hasInvalidInput(inputList);
//       checkInvavidInput(formElement, inputElement, errorClass, inputErrorClass);
//       toggleButtonState(inputList, submitButton, inactiveButtonClass);
//     });
//   });
// }

// function checkInvavidInput(
//   formElement,
//   inputElement,
//   errorClass,
//   inputErrorClass
// ) {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       errorClass,
//       inputErrorClass
//     );
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   inputErrorClass,
//   errorClass
// ) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.textContent = "";
//   errorElement.classList.remove(errorClass);
// }

// function showInputError(
//   formElement,
//   inputElement,
//   errorMessage,
//   errorClass,
//   inputErrorClass
// ) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     disabledButton(buttonElement, inactiveButtonClass);
//   } else {
//     enabledButton(buttonElement, inactiveButtonClass);
//   }
// }

// function enabledButton(buttonElement, inactiveButtonClass) {
//   buttonElement.classList.remove(inactiveButtonClass);
//   buttonElement.disabled = false;
// }

// function disabledButton(buttonElement, inactiveButtonClass) {
//   buttonElement.classList.add(inactiveButtonClass);
//   buttonElement.disabled = true;
// }

// //отчистка ошибок и проверка кнопки при открытиии попапа
// function clearInputErrorCheckButton(form) {
//   const inputList = Array.from(form.querySelectorAll(".modal__item"));
//   const submitButton = form.querySelector(".modal__save-button");
//   inputList.forEach((inputElement) => {
//     const errorElement = form.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove("modal__item_type_error");
//     errorElement.textContent = "";
//     errorElement.classList.remove("modal__error_visible");
//     //проверка кнопки при открытиии попапа
//     toggleButtonState(inputList, submitButton, "modal__save-button_disabled");
//   });
// }

// enableValidation({
//   formSelector: ".modal__form",
//   inputSelector: ".modal__item",
//   submitButtonSelector: ".modal__save-button",
//   inactiveButtonClass: "modal__save-button_disabled",
//   inputErrorClass: "modal__item_type_error",
//   errorClass: "modal__error_visible",
// });