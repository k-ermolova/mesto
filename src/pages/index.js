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
	formUpdate,
	saveUrlButton,
	avatarButton,
	profileAvatar,
} from "../utils/constants.js";

import "./index.css";

const api = new Api({
	baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20/",
	headers: {
		"content-type": "application/json",
		authorization: "0949ddb6-de07-424c-aec4-470c89dc006f",
	},
});

const formEditValidation = new FormValidator(formEdit, validationConfig);
const formAddValidation = new FormValidator(formAdd, validationConfig);
const formUpdateValidation = new FormValidator(formUpdate, validationConfig);

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

const imagePopup = new PopupWithImage(".figure-popup");
imagePopup.setEventListeners();

const popupEdit = new PopupWithForm({
	popupSelector: ".popup_edit",
	handleFormSubmit: (item) => {
		api.updateUserInfo(item).then((res) => {
			userInfo.setUserInfo(res);
		})
		.catch((err) => {
			console.log(err);
		});
		popupEdit.close();
	},
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
	popupSelector: ".popup_add",
	handleFormSubmit: (data) => {
		console.log(data);
		api
		.addNewCard(data)
		.then((res) => {
			console.log(res);
			const cardData = {
				name: res["place-name"],
				link: res["link"],
			};
			const card = createCard(cardData, ".place-template", openImagePopup);
			cardList.prependItem(card);
		})
		.catch((err) => {
			console.log(err);
		});
		// const cardData = {
		// 	name: data["place-name"],
		// 	link: data["link"],
		// };
		// const card = createCard(cardData, ".place-template", openImagePopup);
		// cardList.prependItem(card);
		popupAdd.close();
	},
});
popupAdd.setEventListeners();

const popupUpdate = new PopupWithForm({
	popupSelector: ".popup_update",
	handleFormSubmit: ({ ["avatar-link"]: avatar }) => {
		api
			.updateAvatar(avatar)
			.then((res) => {
				userInfo.setAvatar(res.avatar);
			})
			.catch((err) => {
				console.log(err);
			});
		popupUpdate.close();
	},
});
popupUpdate.setEventListeners();

api
	.getInitialCards()
	.then((data) => {
		createCardList(data);
	})
	.catch((err) => {
		console.log(err);
	});

api
	.getUserInfo()
	.then((data) => {
		userInfo.setUserInfo(data);
		userInfo.setAvatar(data.avatar);
	})
	.catch((err) => {
		console.log(err);
	});

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
	jobInput.value = profileInfo.about;
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

function openFormUpdate() {
	popupUpdate.open();
	formUpdateValidation.enableValidation();
	formUpdateValidation.resetValidityCheck(formUpdate);
	formUpdate.reset();
	formUpdateValidation.setButtonState(
		saveUrlButton,
		formUpdate.checkValidity()
	);
}

function openImagePopup(link, title) {
	imagePopup.open(title, link);
}

editButton.addEventListener("click", openFormEdit);
addButton.addEventListener("click", openFormAdd);
avatarButton.addEventListener("click", openFormUpdate);
