const formEdit = document.querySelector(".popup_edit");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = formEdit.querySelector(".popup__close-button");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const placesContainer = document.querySelector(".places__list");
const placeNameInput = placesContainer.querySelector(
	".input-text_type_heading"
);
const placeLinkInput = placesContainer.querySelector(".input-text_type_link");
const templateElement = document.querySelector(".place-template");

const formAdd = document.querySelector(".popup_create");

const addButton = document.querySelector(".profile__add-button");
const closeAddButton = formAdd.querySelector(".popup__close-button");

const initialCards = [
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
}

function formEditSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileSubtitle.textContent = jobInput.value;
	closePopup(formEdit);
}

function formAddSubmit(evt) {
	evt.preventDefault();
	closePopup(formAdd);
}

editButton.addEventListener("click", () => openPopup(formEdit));
closeEditButton.addEventListener("click", () => closePopup(formEdit));
formEdit.addEventListener("submit", formEditSubmit);
addButton.addEventListener("click", () => openPopup(formAdd));
closeAddButton.addEventListener("click", () => closePopup(formAdd));
formAdd.addEventListener("submit", formAddSubmit);
