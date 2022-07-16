export class Card {
  constructor(cardName, cardLink, template, handleCardClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');

    cardImage.src = this._cardLink;
    cardImage.alt = this._cardName;
    this._element.querySelector('.element__title').textContent = this._cardName;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardLink)
    });
  }
}
