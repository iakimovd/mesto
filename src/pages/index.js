import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import '../pages/index.css';
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards, validationConfig, editProfileButton, addCardButton, profileForm, nameInput, jobInput, addCardForm, cardNameInput, linkInput } from "../utils/constants.js";

const cardFormValidator = new FormValidator(validationConfig, addCardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

function createCard(item) {
  const card = new Card(item.name, item.link, '.card-template', openPhoto);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems();

const addNewCardPopup = new PopupWithForm('.add-card-popup', {
  handleFormSubmit: (data) => {
    const inputs = { name: cardNameInput.value, link: linkInput.value };
    const handleCard = createCard(inputs);
    cardList.addItem(handleCard);
    addNewCardPopup.close();
  }
});

addCardButton.addEventListener('click', function () {
  addNewCardPopup.open();
  cardFormValidator.toggleSaveButton();

});

addNewCardPopup.setEventListeners();


const popupWithImage = new PopupWithImage('.open-picture-popup');

popupWithImage.setEventListeners();

function openPhoto(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__profession'
});

const editProfilePopup = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ newUserName: data.name, newUserInfo: data.job });
    editProfilePopup.close();
  }
});

editProfileButton.addEventListener('click', function () {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.info;
  editProfilePopup.open();
});

editProfilePopup.setEventListeners();
