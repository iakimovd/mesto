import { Popup } from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  deleteCardConfirmation(action) {
    this._handleFormSubmit = action;
    console.log('click clack');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      console.log('delete card');
    });
    
  }
}