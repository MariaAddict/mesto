export default class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, submitButton);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._hasInvalidInput(inputList);
                this._checkInvavidInput(inputElement);
                this._toggleButtonState(inputList, submitButton);
            });
        });
    }


    _checkInvavidInput(
        inputElement
    ) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                inputElement,
                inputElement.validationMessage
            );
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hideInputError(
        inputElement
    ) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _showInputError(
        inputElement,
        errorMessage
    ) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
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
    clearInputErrorCheckButton() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        //проверка кнопки при открытиии попапа
        this._toggleButtonState(inputList, submitButton);
        inputList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(this._inputErrorClass);
            errorElement.textContent = '';
            errorElement.classList.remove(this._errorClass);
        });
    }
}