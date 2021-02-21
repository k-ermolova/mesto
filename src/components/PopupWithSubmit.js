import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handlePopupSubmit }) {
    super(popupSelector);
    this._handlePopupSubmit = handlePopupSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlePopupSubmit();
    })
  }

  open(card, data) {
    super.open();
    this._cardId = card._id;
    this._cardElement = data;
  }
}