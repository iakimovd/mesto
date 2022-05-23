import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./cards.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error'
}

const content = document.querySelector('.content');
const editProfileButton = content.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const addCardPopup = document.querySelector('.add-card-popup');
const openPicturePopup = document.querySelector('.open-picture-popup');
const addCardButton = document.querySelector('.profile__add-button');
const profileCloseButton = document.querySelector('.popup__close-button');
const addCardCloseButton = document.querySelector('.popup__close-button_add-new-card');
const openPictureCloseButton = document.querySelector('.popup__close-picture-show');
const profileForm = document.querySelector('.popup__container');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const nameEdit = document.querySelector('.profile__name');
const jobEdit = document.querySelector('.profile__profession');
const cards = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image');
const popupPictureDescription = document.querySelector('.popup__picture-description');
const addCardForm = document.querySelector('.popup__container_add-new-card');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const linkInput = addCardForm.querySelector('.popup__input_type_link');
const inputList = Array.from(addCardForm.querySelectorAll('.popup__input'));

const cardFormValidator = new FormValidator(validationConfig, addCardForm);
const profileFormValidator = new FormValidator(validationConfig,  profileForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Buttons
editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = nameEdit.textContent;
  jobInput.value = jobEdit.textContent;
});
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
addCardButton.addEventListener('click', function () {
  cardFormValidator.toggleSaveButton(inputList);
  openPopup(addCardPopup);
});
addCardCloseButton.addEventListener('click', () => closePopup(addCardPopup));
openPictureCloseButton.addEventListener('click', () => closePopup(openPicturePopup));
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  content.addEventListener('keydown', closePopupEscPress);
  popup.addEventListener('click', closePopupOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  content.removeEventListener('keydown', closePopupEscPress);
  popup.removeEventListener('click', closePopupOverlayClick);
}

function closePopupEscPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function closePopupOverlayClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameEdit.textContent = nameInput.value;
  jobEdit.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const element = new Card(cardNameInput.value, linkInput.value, '.card-template', openPhoto).generateCard();
  cards.prepend(element);
  closePopup(addCardPopup);
  evt.target.reset();
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link, '.card-template', openPhoto);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cards.append(cardElement);
});

function openPhoto(name, link) {
  popupImage.alt = name;
  popupImage.src = link;
  popupPictureDescription.textContent = name;
  openPopup(openPicturePopup);
}
