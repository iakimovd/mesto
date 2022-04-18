const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const content = document.querySelector('.content');
const editProfileButton = content.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const addCardPopup = document.querySelector('.add-card-popup');
const openPicturePopup = document.querySelector('.open-picture-popup');
const profileSaveButton = document.querySelector('.popup__save-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileCloseButton = document.querySelector('.popup__close-button');
const addCardCloseButton = document.querySelector('.popup__close-button_add-new-card');
const openPictureCloseButton = document.querySelector('.popup__close-picture-show');
const profileInfo = content.querySelector('.profile__info');
const profileForm = document.querySelector('.popup__container');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const nameEdit = document.querySelector('.profile__name');
const jobEdit = document.querySelector('.profile__profession');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template');
const popupImage = document.querySelector('.popup__image');
const popupPictureDescription = document.querySelector('.popup__picture-description');
const addCardForm = document.querySelector('.popup__container_add-new-card');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const linkInput = addCardForm.querySelector('.popup__input_type_link');

// Buttons
editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = nameEdit.textContent;
  jobInput.value = jobEdit.textContent;
});
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
addCardButton.addEventListener('click', () => openPopup(addCardPopup));
addCardCloseButton.addEventListener('click', () => closePopup(addCardPopup));
openPictureCloseButton.addEventListener('click', () => closePopup(openPicturePopup));
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  console.log('open popup');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  console.log('close popup');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameEdit.textContent = nameInput.value;
  jobEdit.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const element = getCards({ name: cardNameInput.value, link: linkInput.value });
  cards.prepend(element);
  cardNameInput.value = "";
  linkInput.value = "";
  closePopup(addCardPopup);
}

function render() {
  const html = initialCards.map(getCards);
  cards.append(...html);
}

function getCards(item) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const openPictureButton = cardElement.querySelector('.element__picture-button');
  const cardImage = cardElement.querySelector('.element__image');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  likeButton.addEventListener('click', function toggleLike() {
    likeButton.classList.toggle('element__like-button_active');
    console.log('Get Like');
  });

  deleteButton.addEventListener('click', function deleteCard(event) {
    const card = event.target.closest('.element');
    card.remove();
    console.log('Card Deleted');
  });

  openPictureButton.addEventListener('click', function () {
    openPopup(openPicturePopup);
    popupPictureDescription.textContent = item.name;
    popupImage.src = item.link;
    popupImage.alt = item.name;
    console.log('Open big picture');
  });

  return cardElement;
}

render();
