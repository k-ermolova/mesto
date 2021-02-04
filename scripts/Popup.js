export default class Popup {
	constructor(popup) {
		this._popup = popup;
	}

	open() {
		this._popup.classList.add("popup_opened");
	}

	close() {
		this._popup.classList.remove("popup_opened");
	}

	_handleEscClose() {
		const activePopup = document.querySelector(".popup_opened");
		if (evt.key === "Escape") {
			closePopup(activePopup);
		}
	}

	setEventListeners() {
		const closeButton = this._popup.querySelector(".popup__close-button");
		closeButton.addEventListener("click", () => this.close.bind(this));
	}
}
