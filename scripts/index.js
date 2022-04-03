let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__info_edit-button');
let saveButton = document.querySelector('.popup__container_save-button');
let closeButton = document.querySelector('.popup__close-button');
let profileInfo = content.querySelector('.profile__info');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__container_name-edit');
let jobInput = formElement.querySelector('.popup__container_profession-edit');
let nameEdit = document.querySelector('.profile__info_name');  // Выберите элементы, куда должны быть вставлены значения полей
let jobEdit = document.querySelector('.profile__info_profession');

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
  let nameEdit = document.querySelector('.profile__info_name');  // Выберите элементы, куда должны быть вставлены значения полей
  let jobEdit = document.querySelector('.profile__info_profession');
  nameEdit.textContent = nameInput.value;
  jobEdit.textContent = jobInput.value;
  popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 