let formElement = document.querySelector(".popup");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = formElement.querySelector(".popup__close-button");
let nameInput = formElement.querySelector(".input-text_type_name");
let jobInput = formElement.querySelector(".input-text_type_job");

function formInsert() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
	formElement.classList.remove("popup_opened");
}

function openPopup() {
	formElement.classList.add("popup_opened");
	formInsert();
}

function formSubmitHandler(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileSubtitle.textContent = jobInput.value;
	closePopup();
}

closeButton.addEventListener("click", closePopup);
editButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", formSubmitHandler);