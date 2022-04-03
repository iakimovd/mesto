let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');
let profileInfo = content.querySelector('.profile__info');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name-edit');
let jobInput = formElement.querySelector('.popup__profession-edit');
let nameEdit = document.querySelector('.profile__name');
let jobEdit = document.querySelector('.profile__profession');

editButton.addEventListener('click', popupActivate);
closeButton.addEventListener('click', popupClose);
saveButton.addEventListener('click', formSubmitHandler);

function popupActivate() {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}

function popupClose() {
  let popup = document.querySelector('.popup');
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