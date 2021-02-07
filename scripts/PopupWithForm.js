import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector);
		this._form = this._popupSelector.querySelector(".popup__container");
		this._handleFormSubmit = handleFormSubmit;
	}

	_getInputValues() {
		const formData = {};
		this._form
			.querySelectorAll(".input-text")
			.forEach((input) => {
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
}
