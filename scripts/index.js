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

let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupAddNewCard = document.querySelector('.popup_add-new-card');
let popupPictureShow = document.querySelector('.popup_picture-show');
let saveButton = document.querySelector('.popup__save-button');
let addButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelector('.popup__close-button');
let closeButtonAddNewCard = document.querySelector('.popup__close-button_add-new-card');
let closeButtonPictureShow = document.querySelector('.popup__close-picture-show');
let profileInfo = content.querySelector('.profile__info');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let nameEdit = document.querySelector('.profile__name');
let jobEdit = document.querySelector('.profile__profession');

editButton.addEventListener('click', popupActivate);
addButton.addEventListener('click', popupAddNewCardActivate);
closeButton.addEventListener('click', popupClose);
closeButtonAddNewCard.addEventListener('click', popupClose);
closeButtonPictureShow.addEventListener('click', popupClose);

function popupAddNewCardActivate() {
  popupAddNewCard.classList.add('popup_opened');
}

function popupActivate() {
  nameInput.value = nameEdit.textContent;
  jobInput.value = jobEdit.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
  popupAddNewCard.classList.remove('popup_opened');
  popupPictureShow.classList.remove('popup_opened');
  console.log('popup close');
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

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template');

function render() {
  const html = initialCards.map(getCards);
  cards.append(...html);
}

function getCards(item) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const title = cardElement.querySelector('.element__title');
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const showPictureButton = cardElement.querySelector('.element__picture-button');
  title.textContent = item.name;
  const src = cardElement.querySelector('.element__image');
  src.src = item.link;
  src.alt = item.name;

  likeButton.addEventListener('click', function likeActivate() {
    likeButton.classList.toggle('element__like-button_active');
    console.log('Get Like');
  });

  deleteButton.addEventListener('click', function cardDelete(event) {
    const card = event.target.closest('.element');
    card.remove();
    console.log('Card Deleted');
  });

  showPictureButton.addEventListener('click', function popupShowPictureActivate() {
    popupPictureShow.classList.add('popup_opened');
    const popupImage = document.querySelector('.popup__image');
    const popupPictureDescription = document.querySelector('.popup__picture-description');
    popupPictureDescription.textContent = item.name;
    popupImage.src = item.link;
    popupImage.alt = item.name;
    console.log('Open big picture');
  });

  return cardElement;
}

render();

let formElementNewCard = document.querySelector('.popup__container_add-new-card');
let cardNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
let linkInput = formElementNewCard.querySelector('.popup__input_type_link');

function newCardSubmitHandler(evt) {
  evt.preventDefault();
  let cardNameEdit = document.querySelector('.element__title');
  let linkEdit = document.querySelector('.element__image');
  const element = getCards({name: cardNameInput.value, link: linkInput.value});
  cards.prepend(element);
  popupClose();
}

formElementNewCard.addEventListener('submit', newCardSubmitHandler);

