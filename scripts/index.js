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
const addCardSaveButton = addCardForm.querySelector('.popup__save-button');
const inputList = Array.from(addCardForm.querySelectorAll('.popup__input'));

// Buttons
editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = nameEdit.textContent;
  jobInput.value = jobEdit.textContent;
});
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
addCardButton.addEventListener('click', function () {
  toggleSaveButton(inputList, addCardSaveButton, validationConfig.inactiveButtonClass);
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
  const element = createCard({ name: cardNameInput.value, link: linkInput.value });
  cards.prepend(element);
  closePopup(addCardPopup);
  evt.target.reset();
}

function renderInitialCards() {
  const cardsList = initialCards.map(createCard);
  cards.append(...cardsList);
}

function createCard(item) {
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
  });

  deleteButton.addEventListener('click', function deleteCard(event) {
    const card = event.target.closest('.element');
    card.remove();
  });

  openPictureButton.addEventListener('click', function () {
    openPopup(openPicturePopup);
    popupPictureDescription.textContent = item.name;
    popupImage.src = item.link;
    popupImage.alt = item.name;
  });

  return cardElement;
}

renderInitialCards();
