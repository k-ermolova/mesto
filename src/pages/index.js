import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

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
		popupEdit.renderLoading(true);
		api.updateUserInfo(item).then((res) => {
			userInfo.setUserInfo(res);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => popupEdit.renderLoading(false));
		popupEdit.close();
	},
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
	popupSelector: ".popup_add",
	handleFormSubmit: (data) => {
		console.log(data);
		popupAdd.renderLoading(true);
		api
		.addNewCard(data)
		.then((res) => {
			const cardData = {
				name: res["name"],
				link: res["link"],
			};
			const card = createCard(cardData, ".place-template", openImagePopup);
			cardList.prependItem(card);
			
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => popupAdd.renderLoading(false));
		popupAdd.close();
	},
});
popupAdd.setEventListeners();

const popupUpdate = new PopupWithForm({
	popupSelector: ".popup_update",
	handleFormSubmit: ({ ["avatar-link"]: avatar }) => {
		popupUpdate.renderLoading(true);
		api
			.updateAvatar(avatar)
			.then((res) => {
				userInfo.setAvatar(res.avatar);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => popupUpdate.renderLoading(false));
		popupUpdate.close();
	},
});
popupUpdate.setEventListeners();

const popupSubmit = new PopupWithSubmit({
	popupSelector: ".popup_confirm", 
	handlePopupSubmit: {

	}
});
popupSubmit.setEventListeners();

const cardList = new Section(
	{
		renderer: (item) => {
			const cardItem = createCard(item, ".place-template", openImagePopup);
			cardList.addItem(cardItem);
		},
	},
	placesContainer
);

api
	.getInitialCards()
	.then((data) => {
		cardList.renderItems(data)
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
