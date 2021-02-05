import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(containerSelector) {
		super(containerSelector);
		this._imagePopupTitle = document.querySelector(".popup__description");
		this._imagePopupLink = document.querySelector(".popup__image");
	}
	open(title, link) {
		super.open(title, link);
		this._imagePopupTitle.textContent = title;
		this._imagePopupLink.src = link;
	}
}
