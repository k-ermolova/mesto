const formEdit = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = formEdit.querySelector(".popup__close-button");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const formAdd = document.querySelector(".popup_create");
const addButton = document.querySelector(".profile__add-button");
const closeAddButton = formAdd.querySelector(".popup__close-button");

const placesContainer = document.querySelector(".places__list");
const placeNameInput = formAdd.querySelector(".input-text_type_heading");
const placeLinkInput = formAdd.querySelector(".input-text_type_link");
const templateElement = document.querySelector(".place-template");
const removeButton = templateElement.querySelector(".place__delete-button");

const imagePopup = document.querySelector(".figure-popup");
const closeImagePopup = imagePopup.querySelector(".popup__close-button");

const initialPlaces = [
	{
		name: "Архыз",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

function formInsert() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}

function openPopup(popup) {
	popup.classList.add("popup_opened");
	formInsert();
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");
	clearPopupInputs();
}

function formEditSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileSubtitle.textContent = jobInput.value;
	closePopup(formEdit);
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
	likeButtonElement.addEventListener("click", function (evt) {
		evt.target.classList.toggle("place__like-button_active");
	});
	linkElement.addEventListener("click", () => showImagePopup({ name, link }));

	return placeElement;
}

function renderPlacesList() {
	const listPlaces = initialPlaces.map(composePlace);
	placesContainer.append(...listPlaces);
}

function clearPopupInputs() {
	placeNameInput.value = "";
	placeLinkInput.value = "";
}

function addNewPlace() {
	const placeName = placeNameInput.value;
	const placeLink = placeLinkInput.value;
	const newPlace = composePlace({ name: placeName, link: placeLink });
	placesContainer.prepend(newPlace);
}

function formAddSubmit(evt) {
	evt.preventDefault();
	addNewPlace();
	closePopup(formAdd);
	clearPopupInputs();
}

function removePlace(evt) {
	const targetDeleteElement = evt.target.closest(".place");
	return targetDeleteElement.remove();
}

function showImagePopup({ name, link }) {
	const imagePopupName = imagePopup.querySelector(".popup__description");
	const imagePopupLink = imagePopup.querySelector(".popup__image");
	imagePopupName.textContent = name;
	imagePopupLink.src = link;
	console.log(name);
	openPopup(imagePopup);
}

renderPlacesList();
editButton.addEventListener("click", () => openPopup(formEdit));
closeEditButton.addEventListener("click", () => closePopup(formEdit));
formEdit.addEventListener("submit", formEditSubmit);
addButton.addEventListener("click", () => openPopup(formAdd));
closeAddButton.addEventListener("click", () => closePopup(formAdd));
formAdd.addEventListener("submit", formAddSubmit);
closeImagePopup.addEventListener("click", () => closePopup(imagePopup));
