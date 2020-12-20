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

const templateElement = document.querySelector(".place-template");
const removeButton = templateElement.querySelector(".place__delete-button");

const imagePopup = document.querySelector(".figure-popup");
const imagePopupName = imagePopup.querySelector(".popup__description");
const imagePopupLink = imagePopup.querySelector(".popup__image");
const clickCloseImagePopup = imagePopup.querySelector(".popup__close-button");

const validationConfig = {
	formSelector: ".popup__container",
	inputSelector: ".input-text",
	submitButtonSelector: ".popup__save-button",
	inactiveButtonClass: "popup__save-button_disabled",
	inputErrorClass: "input-text_state_invalid",
};

function insertForm() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}

function openPopup(popup) {
	popup.classList.add("popup_opened");
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");
}

function openFormEdit() {
	openPopup(popupEdit);
	insertForm();
	resetValidityCheck(formEdit, validationConfig);
	enableValidation(validationConfig);
}

function checkClass(popup) {
	if (!popup.classList.contains("figure-popup")) {
		return true;
	} else {
		return false;
	}
}

function cleanAndCloseForm(popup) {
	if (checkClass(popup)) {
		const form = popup.querySelector(".popup__container");
		cleanPopupInputs(form);
		resetValidityCheck(form, validationConfig);
		closePopup(popup);
	} else {
		closePopup(popup);
	}
}

function insertProfileValues() {
	profileTitle.textContent = nameInput.value;
	profileSubtitle.textContent = jobInput.value;
}

function handleFormEdit(evt) {
	evt.preventDefault();
	insertProfileValues();
	resetValidityCheck(formEdit, validationConfig);
	closePopup(popupEdit);
}

function handleLikeButton(evt) {
	evt.target.classList.toggle("place__like-button_active");
}

function composePlace({ name, link }) {
	const placeElement = templateElement.content.cloneNode("true");
	const nameElement = placeElement.querySelector(".place__title");
	const linkElement = placeElement.querySelector(".place__image");
	const removeButtonElement = placeElement.querySelector(
		".place__delete-button"
	);
	const likeButtonElement = placeElement.querySelector(".place__like-button");
	nameElement.textContent = name;
	linkElement.src = link;

	removeButtonElement.addEventListener("click", removePlace);
	likeButtonElement.addEventListener("click", handleLikeButton);
	linkElement.addEventListener("click", () => showImagePopup({ name, link }));

	return placeElement;
}

function renderPlacesList() {
	const listPlaces = initialPlaces.map(composePlace);
	placesContainer.append(...listPlaces);
}

function cleanPopupInputs(form) {
	form.reset();
}

function addNewPlace() {
	const placeName = placeNameInput.value;
	const placeLink = placeLinkInput.value;
	const newPlace = composePlace({ name: placeName, link: placeLink });
	placesContainer.prepend(newPlace);
}

function handleAddNewPlace(evt) {
	evt.preventDefault();
	addNewPlace();
	closePopup(popupAdd);
}

function removePlace(evt) {
	const targetDeleteElement = evt.target.closest(".place");
	return targetDeleteElement.remove();
}

function showImagePopup({ name, link }) {
	imagePopupName.textContent = name;
	imagePopupLink.src = link;
	openPopup(imagePopup);
}

function closeByEscape(popup) {
	document.addEventListener("keydown", (evt) => {
		if (evt.key === "Escape") {
			cleanAndCloseForm(popup);
		}
	});
}

function closeByOverlay() {
	const popupList = document.querySelectorAll(".popup");
	popupList.forEach((popup) => {
		popup.addEventListener("click", (evt) => {
			cleanAndCloseForm(evt.target);
		});
	});
}

function setCloseByEscape() {
	closeByEscape(popupAdd);
	closeByEscape(popupEdit);
	closeByEscape(imagePopup);
}

renderPlacesList();
setCloseByEscape();
closeByOverlay();
editButton.addEventListener("click", openFormEdit);
clickCloseEditButton.addEventListener("click", () =>
	cleanAndCloseForm(popupEdit)
);
popupEdit.addEventListener("submit", handleFormEdit);
addButton.addEventListener("click", () => openPopup(popupAdd));
clickCloseAddButton.addEventListener("click", () =>
	cleanAndCloseForm(popupAdd)
);
popupAdd.addEventListener("submit", handleAddNewPlace);
clickCloseImagePopup.addEventListener("click", () => closePopup(imagePopup));
