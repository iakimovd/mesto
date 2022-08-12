import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import '../pages/index.css';
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { initialCards, validationConfig, avatarLinkInput, editAvatarForm, editAvatarButton, editProfileButton, addCardButton, profileForm, nameInput, jobInput, addCardForm, cardNameInput, linkInput } from "../utils/constants.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const cardFormValidator = new FormValidator(validationConfig, addCardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const profileAvatarFormValidator = new FormValidator(validationConfig, editAvatarForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
profileAvatarFormValidator.enableValidation();

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'da76a411-e3e6-438b-8cb6-f5789c0a7ca5',
    'Content-Type': 'application/json'
  }
});

const createCard = (data) => {
  const card = new Card(
    data,
    '.card-template',
    openPhoto,
    userId,
    () => {
      deleteCardPopup.open();
      deleteCardPopup.deleteCardConfirmation(() => {
        api.deleteCard(data._id)
          .then(() => {
            card.handleDeleteButton();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
            console.dir(err);
          });
      });
    },
    (item) => {
      api.addCardLike(item._id)
        .then((res) => {
          card.addCardLike(res);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    (item) => {
      api.deleteCardLike(item._id)
        .then((res) => {
          card.deleteCardLike(res);
        })
        .catch((err) => {
          console.log(err);
        })
    });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section((cards) => {
  const cardElement = createCard(cards);
  cardList.addItem(cardElement);
}
  , '.elements');

const updateAvatarPopup = new PopupWithForm('.edit-avatar-popup', {
  handleFormSubmit: (data) => {
    updateAvatarPopup.renderLoading(true);
    api.editAvatar(data.avatarlink)
      .then((data) => {
        userInfo.setUserInfo(data);
        updateAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateAvatarPopup.renderLoading(true);;
      });
  }
})

editAvatarButton.addEventListener('click', function () {
  updateAvatarPopup.open();
  profileAvatarFormValidator.resetValidation();
  profileAvatarFormValidator.toggleSaveButton();
});

updateAvatarPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm('.add-card-popup', {
  handleFormSubmit: (data) => {
    addNewCardPopup.renderLoading(true);
    api.addUserCard({ name: data.cardname, link: data.cardlink })
      .then((data) => {
        const handleCard = createCard(data);
        cardList.addItem(handleCard);
        addNewCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { addNewCardPopup.renderLoading(false) });
  }
});

addCardButton.addEventListener('click', function () {
  addNewCardPopup.open();
  cardFormValidator.resetValidation();
  cardFormValidator.toggleSaveButton();
});

addNewCardPopup.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_picture-show');

popupWithImage.setEventListeners();

function openPhoto(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__profession',
  userAvatar: '.profile__avatar'
});

const editProfilePopup = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (data) => {
    editProfilePopup.renderLoading(true);
    api.editUserInfo(data.name, data.job)
      .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { editProfilePopup.renderLoading(false) });
    editProfilePopup.close();
  }
});

editProfileButton.addEventListener('click', function () {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

editProfilePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation('.delete-card-popup');

deleteCardPopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch(err => { console.log(err) });