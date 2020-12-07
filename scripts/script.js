const formEdit = document.querySelector(".popup_edit");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = formEdit.querySelector(".popup__close-button");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const formAdd = document.querySelector(".popup_create");

const addButton = document.querySelector(".profile__add-button");
const closeAddButton = formAdd.querySelector(".popup__close-button");

const places = document.querySelector(".places");
const placesContainer = places.querySelector(".place");

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
/*
function addPlace(name, link) {
	const placeTemplate = document.querySelector("#place-template").content;
	const placeElement = placeTemplate.cloneNode(true);
	placeElement.querySelector('.place__title').textContent = name;
  placeElement.querySelector('.place__image').textContent = link;
	
	placeElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
		evt.target.classList.toggle('place__like-button_active')
}); 

placesContainer.append(placeElement);
}*/

editButton.addEventListener("click", () => openPopup(formEdit));
closeEditButton.addEventListener("click", () => closePopup(formEdit));
formEdit.addEventListener("submit", formEditSubmit);
addButton.addEventListener("click", () => openPopup(formAdd));
closeAddButton.addEventListener("click", () => closePopup(formAdd));
formAdd.addEventListener("submit", formAddSubmit);
