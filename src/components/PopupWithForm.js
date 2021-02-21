import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector);
		this._form = this._popup.querySelector(".popup__container");
		this._handleFormSubmit = handleFormSubmit;
	}

	_getInputValues() {
		const formData = {};
		this._form.querySelectorAll(".input-text").forEach((input) => {
			formData[input.name] = input.value;
		});

		return formData;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener("submit", (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
		});
	}

	close() {
		super.close();
		this._form.reset();
	}

	renderLoading(isLoading) {
		const saveButton = this._popup.querySelector(".popup__save-button");
		if (isLoading) {
			saveButton.textContent = "Сохранение...";
		} else {
			saveButton.textContent = "Сохранить";
		}
	}
}
