import Card from "./Card.js";
import { initialPlaces } from "./initial-places.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./validation-config.js";

const popupEdit = document.querySelector(".popup_edit");
const formEdit = popupEdit.querySelector(".popup__container");

const editButton = document.querySelector(".profile__edit-button");
const clickCloseEditButton = popupEdit.querySelector(".popup__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const popupAdd = document.querySelector(".popup_add");
const formAdd = popupAdd.querySelector(".popup__container");

const addButton = document.querySelector(".profile__add-button");
const clickCloseAddButton = popupAdd.querySelector(".popup__close-button");

const placesContainer = document.querySelector(".places__list");

const placeNameInput = formAdd.querySelector(".input-text_type_heading");
const placeLinkInput = formAdd.querySelector(".input-text_type_link");

const imagePopup = document.querySelector(".figure-popup");
const clickCloseImagePopup = imagePopup.querySelector(".popup__close-button");

const formEditValidation = new FormValidator(formEdit, validationConfig);
const formAddValidation = new FormValidator(formAdd, validationConfig);

function insertForm() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}

function openPopup(popup) {
	popup.classList.add("popup_opened");
	document.addEventListener("keydown", closeByEscape);
	document.addEventListener("click", closeByOverlay);
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");
	document.removeEventListener("keydown", closeByEscape);
	document.removeEventListener("click", closeByOverlay);
}

function openFormEdit() {
	insertForm();
	openPopup(popupEdit);
	formEditValidation.enableValidation();
	formEditValidation.resetValidityCheck(formEdit);
}

function openFormAdd() {
	openPopup(popupAdd);
	formAddValidation.enableValidation();
	formAddValidation.resetValidityCheck(formAdd);
	formAdd.reset();
}

function openImagePopup() {
	openPopup(imagePopup);
}

function insertProfileValues() {
	profileTitle.textContent = nameInput.value;
	profileSubtitle.textContent = jobInput.value;
}

function handleFormEdit(evt) {
	evt.preventDefault();
	insertProfileValues();
	formEditValidation.resetValidityCheck(formEdit);
	closePopup(popupEdit);
}

function renderPlacesList(places) {
	const listPlaces = places.map((item) => {
		const card = new Card(item, ".place-template", openImagePopup);
		return card.generateCard();
	});
	placesContainer.append(...listPlaces);
}

function addNewPlace() {
	const card = new Card(
		{
			name: placeNameInput.value,
			link: placeLinkInput.value,
		},
		".place-template",
		openImagePopup
	);

	placesContainer.prepend(card.generateCard());
}

function handleAddNewPlace(evt) {
	evt.preventDefault();
	addNewPlace();
	closePopup(popupAdd);
}

function closeByEscape(evt) {
	const activePopup = document.querySelector(".popup_opened");
	if (evt.key === "Escape") {
		closePopup(activePopup);
	}
}

function closeByOverlay(evt) {
	if (evt.target.classList.contains("popup_opened")) {
		closePopup(evt.target);
	}
}

renderPlacesList(initialPlaces);
editButton.addEventListener("click", openFormEdit);
clickCloseEditButton.addEventListener("click", () => closePopup(popupEdit));
popupEdit.addEventListener("submit", handleFormEdit);
addButton.addEventListener("click", openFormAdd);
clickCloseAddButton.addEventListener("click", () => closePopup(popupAdd));
popupAdd.addEventListener("submit", handleAddNewPlace);
clickCloseImagePopup.addEventListener("click", () => closePopup(imagePopup));
