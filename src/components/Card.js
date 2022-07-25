import { data } from "autoprefixer";

export class Card {
  constructor(data, template, handleCardClick, userId, handleCardDelete, handleAddLikeClick, handleDeleteLikeClick ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    
    this._userId = userId;
    this._cardId = data._id;
    this._cardLikes = data.likes;
    this._ownerId = data.owner._id;

    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  addCardLike(data) {
    this._likeButton.classList.add('element__like-button_active');
    this._cardLikes = data.likes;
    this._likeCounter.textContent = this._cardLikes.length;
  }

  deleteCardLike(data) {
    this._likeButton.classList.remove('element__like-button_active');
    this._cardLikes = data.likes;
    this._likeCounter.textContent = this._cardLikes.length;
  }


  _isLiked = () => this._cardLikes.some((item) => item._id === this._userId);

  _handleLikeButton = () => {
    if (this._isLiked()) {
      this._handleDeleteLikeClick(this._data);
    } else {
      this._handleAddLikeClick(this._data);
    }
  }

  handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeButton.addEventListener('click', this._handleLikeButton);

    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._deleteButton.addEventListener('click', () => this._handleCardDelete(this.data));

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');

    this._setEventListeners();

    if (this._ownerId === this._userId) {
      this._deleteButton.classList.add('element__delete-button_active');
    };

    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._cardLikes.length;

    if (this._isLiked()) {
      this.addCardLike(this._data);
    };

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
