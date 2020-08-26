export default class FormValidator {
    constructor(data, form) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const submitButton = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, submitButton);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._hasInvalidInput(inputList);
                this._checkInvavidInput(formElement, inputElement);
                this._toggleButtonState(inputList, submitButton);
            });
        });
    }


    _checkInvavidInput(
        formElement,
        inputElement
    ) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                formElement,
                inputElement,
                inputElement.validationMessage
            );
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _hideInputError(
        formElement,
        inputElement
    ) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _showInputError(
        formElement,
        inputElement,
        errorMessage
    ) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disabledButton(buttonElement);
        } else {
            this._enabledButton(buttonElement);
        }
    }

    _enabledButton(buttonElement) {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
    }

    _disabledButton(buttonElement) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    }

    //отчистка ошибок и проверка кнопки при открытиии попапа
    clearInputErrorCheckButton(form) {
        const inputList = Array.from(form.querySelectorAll('.modal__item'));
        const submitButton = form.querySelector('.modal__save-button');
        inputList.forEach((inputElement) => {
            const errorElement = form.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove('modal__item_type_error');
            errorElement.textContent = '';
            errorElement.classList.remove('modal__error_visible');
            //проверка кнопки при открытиии попапа
            this._toggleButtonState(inputList, submitButton);
        });
    }
}