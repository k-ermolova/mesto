import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import {
	initialPlaces,
	validationConfig,
	formEdit,
	editButton,
	profileTitle,
	profileSubtitle,
	nameInput,
	jobInput,
	formAdd,
	savePlaceButton,
	addButton,
	placesContainer,
	placeNameInput,
	placeLinkInput,
	imagePopupLink,
	imagePopupName,
} from "../utils/constants.js";

const formEditValidation = new FormValidator(formEdit, validationConfig);
const formAddValidation = new FormValidator(formAdd, validationConfig);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const cardList = new Section(
	{
		data: initialPlaces,
		renderer: (item) => {
			const card = new Card(item, ".place-template", openImagePopup);
			const cardElement = card.generateCard();
			cardList.addItem(cardElement);
		},
	},
	placesContainer
);

const imagePopup = new PopupWithImage(document.querySelector(".figure-popup"));
imagePopup.setEventListeners();

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
addButton.addEventListener("click", openFormAdd);
