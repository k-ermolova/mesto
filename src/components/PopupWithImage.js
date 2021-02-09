import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(containerSelector) {
		super(containerSelector);
		this._imagePopupTitle = document.querySelector(".popup__description");
		this._imagePopupLink = document.querySelector(".popup__image");
	}
	open(name, link) {
		super.open();
		this._imagePopupTitle.textContent = name;
		this._imagePopupLink.src = link;
	}
}
