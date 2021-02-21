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
	addButton,
	placesContainer,
	formUpdate,
	avatarButton,
	profileAvatar,
} from "../utils/constants.js";

import "./index.css";

let userId;

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

formEditValidation.enableValidation();
formAddValidation.enableValidation();
formUpdateValidation.enableValidation();

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

const imagePopup = new PopupWithImage(".figure-popup");
imagePopup.setEventListeners();

const popupEdit = new PopupWithForm({
	popupSelector: ".popup_edit",
	handleFormSubmit: (item) => {
		popupEdit.renderLoading(true);
		api
			.updateUserInfo(item)
			.then((res) => {
				userInfo.setUserInfo(res);
				popupEdit.close();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => popupEdit.renderLoading(false));
	},
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
	popupSelector: ".popup_add",
	handleFormSubmit: (data) => {
		popupAdd.renderLoading(true);
		api
			.addNewCard(data)
			.then((res) => {
				const card = createCard(res);
				cardList.prependItem(card);
				popupAdd.close();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => popupAdd.renderLoading(false));
	},
});
popupAdd.setEventListeners();

const popupUpdate = new PopupWithForm({
	popupSelector: ".popup_update",
	handleFormSubmit: ({ ["avatar-link"]: avatar }) => {
		console.log();
		popupUpdate.renderLoading(true);
		api
			.updateAvatar(avatar)
			.then((res) => {
				userInfo.setAvatar(res.avatar);
				popupUpdate.close();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => popupUpdate.renderLoading(false));
	},
});
popupUpdate.setEventListeners();

const popupSubmit = new PopupWithSubmit({
	popupSelector: ".popup_confirm",
	handlePopupSubmit: () => {
		api
			.deleteCard(popupSubmit.cardId)
			.then(() => {
				popupSubmit.cardElement.remove();
				popupSubmit.close();
			})
			.catch((err) => {
				console.log(err);
			});
	},
});
popupSubmit.setEventListeners();

const cardList = new Section(
	{
		renderer: (item) => {
			const cardItem = createCard(item);
			cardList.addItem(cardItem);
		},
	},
	placesContainer
);

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
	([userData, cards]) => {
		userInfo.setUserInfo(userData);
		userInfo.setAvatar(userData.avatar);
		userId = userData._id;
		cardList.renderItems(cards);
	}
);

function createCard(item) {
	const card = new Card(
		item,
		userId,
		".place-template",
		() => imagePopup.open(item.name, item.link),
		handleLikeButton,
		() => popupSubmit.open(item, card),
		api
	).generateCard();
	return card;
}

function handleLikeButton(likeButton, cardId, cardLikes, likeCounter) {
	if (likeButton.classList.contains("place__like-button_active")) {
		api
			.deleteLike(cardId)
			.then((res) => {
				likeButton.classList.toggle("place__like-button_active");
				cardLikes.length = res.likes.length;
				likeCounter.textContent = cardLikes.length;
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		api
			.putLike(cardId)
			.then((res) => {
				likeButton.classList.toggle("place__like-button_active");
				cardLikes.length = res.likes.length;
				likeCounter.textContent = cardLikes.length;
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

function openFormEdit() {
	const profileInfo = userInfo.getUserInfo();
	nameInput.value = profileInfo.name;
	jobInput.value = profileInfo.about;
	popupEdit.open();
	formEditValidation.resetValidityCheck();
}

function openFormAdd() {
	popupAdd.open();
	formAddValidation.resetValidityCheck();
	formAdd.reset();
	formAddValidation.setButtonState();
}

function openFormUpdate() {
	popupUpdate.open();
	formUpdateValidation.resetValidityCheck();
	formUpdate.reset();
	formUpdateValidation.setButtonState();
}

editButton.addEventListener("click", openFormEdit);
addButton.addEventListener("click", openFormAdd);
avatarButton.addEventListener("click", openFormUpdate);
