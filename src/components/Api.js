export default class Api {
	constructor(options) {
		this._url = options.baseUrl;
		this._headers = options.headers;
	}

	_onError(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject("Сервер недоступен");
	}

	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: this._headers,
		}).then(this._onError);
	}

	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: this._headers,
		}).then(this._onError);
	}

	updateAvatar(data) {
		return fetch(`${this._url}users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: data,
			}),
		}).then(this._onError);
	}

	updateUserInfo(data) {
		return fetch(`${this._url}users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then(this._onError);
	}

	addNewCard(data) {
		return fetch(`${this._url}cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link,
			}),
		}).then(this._onError);
	}
}
