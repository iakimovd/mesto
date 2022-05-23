export class FormValidator {
  constructor(validationConfig, formSelector) {
    this._validationConfig = validationConfig;
    this._formSelector = formSelector;
  }

  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._validationConfig.inputSelector));
    inputList.forEach((input) => {
      input.addEventListener('input', (event) => {
        this._handleFormInput(input);
        this.toggleSaveButton(inputList);
      });
    });
  }

  _handleFormInput(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      errorNode.textContent = '';
      input.classList.remove(this._validationConfig.inputErrorClass);
    } else {
      errorNode.textContent = input.validationMessage;
      input.classList.add(this._validationConfig.inputErrorClass);
    }
  }

  _checkInputValidaty(inputList) {
    return inputList.some(function (input) {
      return !input.validity.valid;
    });
  };

  toggleSaveButton(inputList) {
    const saveButton = this._formSelector.querySelector(this._validationConfig.buttonSelector);
    if (this._checkInputValidaty(inputList)) {
      saveButton.disabled = true;
      saveButton.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      saveButton.classList.remove(this._validationConfig.inactiveButtonClass);
      saveButton.disabled = false;
    }
  };

  enableValidation() {
    this._setEventListeners();
  }
}