export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
	}

	open() {
		this._popupSelector.classList.add("popup_opened");
		document.addEventListener("keydown", (evt) => {
			this._handleEscClose(evt);
		});
		document.addEventListener("click", (evt) => {
			this._handleOverlayClose(evt);
		});
	}

	close() {
		this._popupSelector.classList.remove("popup_opened");
		document.removeEventListener("keydown", (evt) => {
			this._handleEscClose(evt);
		});
		document.removeEventListener("click", (evt) => {
			this._handleOverlayClose(evt);
		});
	}

	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	_handleOverlayClose(evt) {
		if (evt.target.classList.contains("popup_opened")) {
			this.close(evt.target);
		}
	}

	setEventListeners() {
		this._popupSelector
			.querySelector(".popup__close-button")
			.addEventListener("click", () => this.close());
	}
}
