const formEdit = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const clickCloseEditButton = formEdit.querySelector(".popup__close-button");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const formAdd = document.querySelector(".popup_add");
const addButton = document.querySelector(".profile__add-button");
const clickCloseAddButton = formAdd.querySelector(".popup__close-button");

const placesContainer = document.querySelector(".places__list");
const placeNameInput = formAdd.querySelector(".input-text_type_heading");
const placeLinkInput = formAdd.querySelector(".input-text_type_link");
const formAddInputs = formAdd.querySelector(".popup__container");

const templateElement = document.querySelector(".place-template");
const removeButton = templateElement.querySelector(".place__delete-button");

const imagePopup = document.querySelector(".figure-popup");
const imagePopupName = imagePopup.querySelector(".popup__description");
const imagePopupLink = imagePopup.querySelector(".popup__image");
const clickCloseImagePopup = imagePopup.querySelector(".popup__close-button");

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

function closeAddPopupHandler(){
	cleanPopupInputs(formAddInputs);
	closePopup(formAdd);
}

function openFormEdit() {
	openPopup(formEdit);
	insertForm();
}

function handleFormEdit(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileSubtitle.textContent = jobInput.value;
	closePopup(formEdit);
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
	closePopup(formAdd);
	cleanPopupInputs(formAddInputs);
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

renderPlacesList();
editButton.addEventListener("click", openFormEdit);
clickCloseEditButton.addEventListener("click", () => closePopup(formEdit));
formEdit.addEventListener("submit", handleFormEdit);
addButton.addEventListener("click", () => openPopup(formAdd));
clickCloseAddButton.addEventListener("click", closeAddPopupHandler);
formAdd.addEventListener("submit", handleAddNewPlace);
clickCloseImagePopup.addEventListener("click", () => closePopup(imagePopup));
