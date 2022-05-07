const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error'
}

function setEventListeners(form, { inputSelector, buttonSelector, inactiveButtonClass, inputErrorClass }) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const saveButton = form.querySelector(buttonSelector);
  const errorNode = document.querySelector(`#${inputSelector.id}-error`);
  inputList.forEach((element) => {
    element.addEventListener('input', (event) => {
      handleFormInput(event, inputSelector, inputErrorClass);
      toggleSaveButton(inputList, saveButton, inactiveButtonClass);
    });
  });
}

function handleFormInput(event, inputSelector, inputErrorClass) {
  inputSelector = event.target;
  const errorNode = document.querySelector(`#${inputSelector.id}-error`);
  if (inputSelector.validity.valid) {
    hideInputError(inputSelector, inputErrorClass, errorNode);
  } else {
    showInputError(inputSelector, inputErrorClass, errorNode);
  }
}

function showInputError(inputSelector, inputErrorClass, errorNode) {
  errorNode.textContent = inputSelector.validationMessage;
  inputSelector.classList.add(inputErrorClass);
}

function hideInputError(inputSelector, inputErrorClass, errorNode) {
  errorNode.textContent = '';
  inputSelector.classList.remove(inputErrorClass);
}

function checkInputValidaty(inputList) {
  return inputList.some(function (input) {
    return !input.validity.valid;
  });
};

function toggleSaveButton(inputList, saveButton, inactiveButtonClass) {
  if (checkInputValidaty(inputList)) {
    disableSaveButton(inputList, saveButton, inactiveButtonClass);
  } else {
    enableSaveButton(saveButton, inactiveButtonClass);
  }
}

function disableSaveButton(inputList, saveButton, inactiveButtonClass) {
  saveButton.classList.add(inactiveButtonClass);
  saveButton.disabled = true;
}

function enableSaveButton(saveButton, inactiveButtonClass) {
  saveButton.classList.remove(inactiveButtonClass);
  saveButton.disabled = false;
}

function enableValidation({ formSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (element) => {
      element.preventDefault();
    });
    setEventListeners(form, rest);
  });
}

enableValidation(validationConfig);
