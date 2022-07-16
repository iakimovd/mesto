import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageDescription = this._popup.querySelector('.popup__picture-description');
  }

  open(name, link) {
    super.open();
    this._image.alt = name;
    this._image.src = link;
    this._imageDescription.textContent = name;
  }
}