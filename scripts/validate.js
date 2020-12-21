function showError(form, input, config) {
	const errorElement = form.querySelector(`#${input.name}-error`);
	errorElement.textContent = input.validationMessage;
	input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
	const errorElement = form.querySelector(`#${input.name}-error`);
	errorElement.textContent = "";
	input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
	if (input.validity.valid) {
		hideError(form, input, config);
	} else {
		showError(form, input, config);
	}
}

function setButtonState(button, isActive, config) {
	if (isActive) {
		button.classList.remove(config.inactiveButtonClass);
		button.disabled = false;
	} else {
		button.classList.add(config.inactiveButtonClass);
		button.disabled = true;
	}
}

function setEventListeners(form, config) {
	const inputList = form.querySelectorAll(config.inputSelector);
	const saveButton = form.querySelector(config.submitButtonSelector);
	inputList.forEach((input) => {
		input.addEventListener("input", () => {
			checkInputValidity(form, input, config);
			setButtonState(saveButton, form.checkValidity(), config);
		});
	});
}

function resetValidityCheck(form, config) {
	const inputList = form.querySelectorAll(config.inputSelector);
	const saveButton = form.querySelector(config.submitButtonSelector);
	inputList.forEach((input) => {
		hideError(form, input, config);
		setButtonState(saveButton, form.checkValidity(), config);
	});
}

function enableValidation(config) {
	const formList = document.querySelectorAll(config.formSelector);
	formList.forEach((form) => {
		setEventListeners(form, config);
		form.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});

		const saveButton = form.querySelector(config.submitButtonSelector);
		setButtonState(saveButton, form.checkValidity(), config);
	});
}

