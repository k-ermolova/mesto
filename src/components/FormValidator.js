export default class FormValidator {
	constructor(form, config) {
		this._form = form;
		this._config = config;
		this._inputErrorClass = config.inputErrorClass;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._formSelector = config.formSelector;
		this._inputList = this._form.querySelectorAll(this._inputSelector);
		this._saveButton = this._form.querySelector(this._submitButtonSelector);
	}
	_showError(input) {
		const errorElement = this._form.querySelector(`#${input.name}-error`);
		errorElement.textContent = input.validationMessage;
		input.classList.add(this._inputErrorClass);
	}

	_hideError(input) {
		const errorElement = this._form.querySelector(`#${input.name}-error`);
		errorElement.textContent = "";
		input.classList.remove(this._inputErrorClass);
	}

	_checkInputValidity(input) {
		if (input.validity.valid) {
			this._hideError(input);
		} else {
			this._showError(input);
		}
	}

	setButtonState() {
		if (this._form.checkValidity()) {
			this._saveButton.classList.remove(this._inactiveButtonClass);
			this._saveButton.disabled = false;
		} else {
			this._saveButton.classList.add(this._inactiveButtonClass);
			this._saveButton.disabled = true;
		}
	}

	resetValidityCheck() {
		this._inputList.forEach((input) => {
			this._hideError(input);
			this.setButtonState(this._saveButton, this._form.checkValidity());
		});
	}

	_setEventListeners() {
		this._inputList.forEach((input) => {
			input.addEventListener("input", () => {
				this._checkInputValidity(input);
				this.setButtonState(this._saveButton, this._form.checkValidity());
			});
		});
	}

	enableValidation() {
		this._setEventListeners(this._form);
		this._form.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});

		this.setButtonState(this._saveButton, this._form.checkValidity());
	}
}
