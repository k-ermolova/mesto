export default class Popup {
	constructor(popup) {
		this._popup = popup;
		this.setEventListeners();
	}

	open() {
		this._popup.classList.add("popup_opened");
		document.addEventListener("keydown", this._handleEscClose);
	}

	close() {
		this._popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	_handleEscClose() {
		const activePopup = document.querySelector(".popup_opened");
		if (evt.key === "Escape") {
			closePopup(activePopup);
		}
	}

	setEventListeners() {
		const closeButton = this._popup.querySelector(".popup__close-button");
		closeButton.addEventListener("click", () => this._popup.close());
	}
}
