import Card from "./Card.js";
import { initialPlaces } from "./initial-places.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./validation-config.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const formEdit = document.forms["edit-form"];

const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const formAdd = document.forms["add-form"];

const savePlaceButton = formAdd.querySelector(".popup__save-button");
const addButton = document.querySelector(".profile__add-button");

const placesContainer = document.querySelector(".places__list");

const placeNameInput = formAdd.querySelector(".input-text_type_heading");
const placeLinkInput = formAdd.querySelector(".input-text_type_link");

// const imagePopupLink = document.querySelector(".popup__image");
// const imagePopupName = document.querySelector(".popup__description");

const imagePopup = new PopupWithImage(document.querySelector(".figure-popup"));
// const clickCloseImagePopup = imagePopup.querySelector(".popup__close-button");

const formEditValidation = new FormValidator(formEdit, validationConfig);
const formAddValidation = new FormValidator(
	document.forms["add-form"],
	validationConfig
);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const cardList = new Section(
	{
		data: initialPlaces,
		renderer: (item) => {
			const card = new Card(item, ".place-template");
			const cardElement = card.generateCard();
			cardList.addItem(cardElement);
		},
	},
	placesContainer
);

const popupEdit = new PopupWithForm({
	popupSelector: document.querySelector(".popup_edit"),
	handleFormSubmit: (item) => {
		userInfo.setUserInfo(item);
		popupEdit.close();
	},
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
	popupSelector: document.querySelector(".popup_add"),
	handleFormSubmit: () => {
		const card = new Card(
			{
				name: placeNameInput.value,
				link: placeLinkInput.value,
			},
			".place-template",
			openImagePopup
		);
		placesContainer.prepend(card.generateCard());
		popupAdd.close();
	},
});
popupAdd.setEventListeners();

function openFormEdit() {
	const profileInfo = userInfo.getUserInfo();
	nameInput.value = profileInfo.name;
	jobInput.value = profileInfo.job;
	popupEdit.open();
	formEditValidation.enableValidation();
	formEditValidation.resetValidityCheck(formEdit);
}

function openFormAdd() {
	popupAdd.open();
	formAddValidation.enableValidation();
	formAddValidation.resetValidityCheck(formAdd);
	formAdd.reset();
	formAddValidation.setButtonState(savePlaceButton, formAdd.checkValidity());
}

function openImagePopup(evt) {
	imagePopup.open(imagePopupName, imagePopupLink);
	imagePopupLink.src = evt.target.src;
	imagePopupName.textContent = evt.target
		.closest(".place")
		.querySelector(".place__title").textContent;
}

cardList.renderItems();

editButton.addEventListener("click", openFormEdit);
// popupEdit.addEventListener("submit", handleFormEdit);
addButton.addEventListener("click", openFormAdd);
// popupAdd.addEventListener("submit", handleAddNewPlace);
// clickCloseImagePopup.addEventListener("click", () => closePopup(imagePopup));
