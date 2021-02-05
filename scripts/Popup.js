export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
	}

	open() {
		this._popupSelector.classList.add("popup_opened");
	}

	close() {
		this._popupSelector.classList.remove("popup_opened");
	}

	_handleEscClose() {
		const activePopup = document.querySelector(".popup_opened");
		if (evt.key === "Escape") {
			closePopup(activePopup);
		}
	}

	setEventListeners() {
		const closeButton = this._popupSelector.querySelector(
			".popup__close-button"
		);
		closeButton.addEventListener("click", () => this.close());
	}
}
