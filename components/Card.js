export default class Card {
	constructor(data, cardSelector, openPopup) {
		this._title = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
		this._openPopup = openPopup;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector(".place")
			.cloneNode(true);

		return cardElement;
	}

	_handleLikeButton() {
		this._cardElement
			.querySelector(".place__like-button")
			.classList.toggle("place__like-button_active");
	}

	_handleRemoveButton() {
		this._cardElement.closest(".place").remove();
		this._cardElement = null;
	}

	_setEventListeners() {
		this._cardElement
			.querySelector(".place__like-button")
			.addEventListener("click", () => {
				this._handleLikeButton();
			});

		this._cardElement
			.querySelector(".place__delete-button")
			.addEventListener("click", () => {
				this._handleRemoveButton();
			});

		this._cardElement
			.querySelector(".place__image")
			.addEventListener("click", (evt) => {
				this._openPopup(evt);
			});
	}

	generateCard() {
		this._cardElement = this._getTemplate();
		this._setEventListeners();

		this._cardElement.querySelector(".place__image").src = this._link;
		this._cardElement.querySelector(".place__title").textContent = this._title;

		return this._cardElement;
	}
}
