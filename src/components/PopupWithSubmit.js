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
      this.close();
    })
  }
}