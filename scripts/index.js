let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');
let profileInfo = content.querySelector('.profile__info');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let nameEdit = document.querySelector('.profile__name');
let jobEdit = document.querySelector('.profile__profession');

editButton.addEventListener('click', popupActivate);
closeButton.addEventListener('click', popupClose);

function popupActivate() {
  nameInput.value = nameEdit.textContent;
  jobInput.value = jobEdit.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameEdit = document.querySelector('.profile__name');
  let jobEdit = document.querySelector('.profile__profession');
  nameEdit.textContent = nameInput.value;
  jobEdit.textContent = jobInput.value;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler); 