const formEdit = document.querySelector(".popup_edit"); //кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = formEdit.querySelector(".popup__close-button");

const profileTitle = document.querySelector(".profile__title"); //страница: имя и работа
const profileSubtitle = document.querySelector(".profile__subtitle");

const nameInput = formEdit.querySelector(".input-text_type_name"); //форма: имя и работа
const jobInput = formEdit.querySelector(".input-text_type_job");

const formAdd = document.querySelector(".popup_create"); //кнопка добавления нового места
const addButton = document.querySelector(".profile__add-button");
const closeAddButton = formAdd.querySelector(".popup__close-button");

const placesContainer = document.querySelector(".places__list"); //контейнер для новых мест на странице
const placeNameInput = formAdd.querySelector(//форма: название и ссылка на картинку
	".input-text_type_heading"
);
const placeLinkInput = formAdd.querySelector(".input-text_type_link");
const templateElement = document.querySelector(".place-template");

const initialPlaces = [
	//список мест
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
	//присваиваем полям формы значения имени и работы со страницы
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}

function openPopup(popup) {
	//открываем форму
	popup.classList.add("popup_opened");
	formInsert(); //вызываем функцию, которая вносит значения со страницы в форму
}

function closePopup(popup) {
	//закрываем форму
	popup.classList.remove("popup_opened");
}

function formEditSubmit(evt) {
	evt.preventDefault(); //сбрасываем несохраненные данные
	profileTitle.textContent = nameInput.value; //делаем обратное присвоение данных страницы из формы
	profileSubtitle.textContent = jobInput.value;
	closePopup(formEdit); //и закрываем форму
}

function composePlace({name, link}) {
	//собираем место
  const placeElement = templateElement.content.cloneNode("true");
  const nameElement = placeElement.querySelector(".place__title");
  const linkElement = placeElement.querySelector(".place__image");
	nameElement.textContent = name;
	linkElement.src = link;
	return placeElement;
}

function renderPlacesList() {
const listPlaces = initialPlaces.map(composePlace);
placesContainer.append(...listPlaces);
}

function clearPlaceInputs(){
	placeNameInput.value = "";
	placeLinkInput.value = "";
}

function addNewPlace() {
	const placeName = placeNameInput.value;
	const placeLink = placeLinkInput.value;
	const newPlace = composePlace({ name: placeName, link: placeLink });	
	placesContainer.prepend(newPlace);
	placeNameInput.value = "";
	placeLinkInput.value = "";
}

function formAddSubmit(evt) {
	evt.preventDefault(); //сбрасываем несохраненные данные
	addNewPlace();
	closePopup(formAdd); //закрываем форму
}
renderPlacesList();
editButton.addEventListener("click", () => openPopup(formEdit)); //*клик на кнопку редактирования - открой форму редактирования
closeEditButton.addEventListener("click", () => closePopup(formEdit)); //клик на закрыть - закрой форму редактирования
formEdit.addEventListener("submit", formEditSubmit); //клик на кнопку сохранить - сохрани новые пользовательские данные и закрой форму
addButton.addEventListener("click", () => openPopup(formAdd)); //*клик на кнопку добавить - открой форму добавления
closeAddButton.addEventListener("click", () => closePopup(formAdd));
formAdd.addEventListener("submit", formAddSubmit);
