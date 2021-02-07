export default class FormValidator {
	constructor(form, config) {
		this._form = form;
		this._config = config;
		this._inputErrorClass = config.inputErrorClass;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._formSelector = config.formSelector;
	}
	_showError(form, input) {
		const errorElement = form.querySelector(`#${input.name}-error`);
		errorElement.textContent = input.validationMessage;
		input.classList.add(this._inputErrorClass);
	}

	_hideError(form, input) {
		const errorElement = form.querySelector(`#${input.name}-error`);
		errorElement.textContent = "";
		input.classList.remove(this._inputErrorClass);
	}

	_checkInputValidity(form, input) {
		if (input.validity.valid) {
			this._hideError(form, input);
		} else {
			this._showError(form, input);
		}
	}

	setButtonState(button, isActive) {
		if (isActive) {
			button.classList.remove(this._inactiveButtonClass);
			button.disabled = false;
		} else {
			button.classList.add(this._inactiveButtonClass);
			button.disabled = true;
		}
	}

	resetValidityCheck(form) {
		const inputList = form.querySelectorAll(this._inputSelector);
		const saveButton = form.querySelector(this._submitButtonSelector);
		inputList.forEach((input) => {
			this._hideError(form, input);
			this.setButtonState(saveButton, form.checkValidity());
		});
	}

	_setEventListeners(form) {
		const inputList = form.querySelectorAll(this._inputSelector);
		const saveButton = form.querySelector(this._submitButtonSelector);
		inputList.forEach((input) => {
			input.addEventListener("input", () => {
				this._checkInputValidity(form, input);
				this.setButtonState(saveButton, form.checkValidity());
			});
		});
	}

	enableValidation() {
		this._setEventListeners(this._form);
		this._form.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});

		const saveButton = this._form.querySelector(this._submitButtonSelector);
		this.setButtonState(saveButton, this._form.checkValidity());
	}
}
