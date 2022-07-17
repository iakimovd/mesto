export class FormValidator {
  constructor(validationConfig, formSelector) {
    this._validationConfig = validationConfig;
    this._formSelector = formSelector;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._validationConfig.inputSelector));
    this._submitButton = this._formSelector.querySelector(this._validationConfig.buttonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', (event) => {
        this._handleFormInput(input);
        this.toggleSaveButton();
      });
    });
  }

  _checkInputValidaty() {
    return this._inputList.some(function (input) {
      return !input.validity.valid;
    });
  };

  toggleSaveButton() {
    if (this._checkInputValidaty()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  _handleFormInput(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _showError(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    errorNode.textContent = input.validationMessage;
    input.classList.add(this._validationConfig.inputErrorClass);
  }

  _hideError(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    errorNode.textContent = '';
    input.classList.remove(this._validationConfig.inputErrorClass);
  }

  resetValidation() {
    this.toggleSaveButton();

    this._inputList.forEach((input) => {
      this._hideError(input)
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}