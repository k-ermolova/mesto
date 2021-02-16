import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
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
} from "../utils/constants.js";

import "./index.css";

const api = new Api({
	baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20/",
	headers: {
		"content-type": "application/json",
		authorization: "0949ddb6-de07-424c-aec4-470c89dc006f",
	},
});
api.getInitialCards().then((data) => {
	createCardList(data);
});

const formEditValidation = new FormValidator(formEdit, validationConfig);
const formAddValidation = new FormValidator(formAdd, validationConfig);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const imagePopup = new PopupWithImage(".figure-popup");
imagePopup.setEventListeners();

const popupEdit = new PopupWithForm({
	popupSelector: ".popup_edit",
	handleFormSubmit: (item) => {
		userInfo.setUserInfo(item);
		popupEdit.close();
	},
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
	popupSelector: ".popup_add",
	handleFormSubmit: (data) => {
		const cardData = {
			name: data["place-name"],
			link: data["link"],
		};
		const card = createCard(cardData, ".place-template", openImagePopup);
		cardList.prependItem(card);
		popupAdd.close();
	},
});
popupAdd.setEventListeners();

function createCardList(cards) {
	const cardList = new Section(
		{
			data: cards,
			renderer: (item) => {
				const cardItem = createCard(item, ".place-template", openImagePopup);
				cardList.addItem(cardItem);
			},
		},
		placesContainer
	);
	cardList.renderItems();
}

function createCard(item, cardSelector, handleCardClick) {
	const card = new Card(item, cardSelector, handleCardClick).generateCard();
	return card;
}

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

function openImagePopup(link, title) {
	imagePopup.open(title, link);
}

editButton.addEventListener("click", openFormEdit);
addButton.addEventListener("click", openFormAdd);
