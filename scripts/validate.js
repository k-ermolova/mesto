const inputList = formAdd.querySelectorAll('.input-text'); 

function composeError(form, input) {
	const errorElement = form.querySelector(`#${input.name}-error`);
	errorElement.textContent = input.validationMessage;
}

function showError(form, input) {
	composeError(form, input);
	input.classList.add('input-text_state_invalid');
}

function hideError(form, input) {
	composeError(form, input);
	input.classList.remove('input-text_state_invalid');
}

function checkInputValidity(form, input) {
	if (input.validity.valid) {
		hideError(form, input);
	} else {
		showError(form, input);
	}
}

inputList.forEach(input => {
	input.addEventListener('input', () => {
		checkInputValidity(formAdd, input);
	});
});