export default class Section {
	constructor({ renderer }, containerSelector) {
		this._renderer = renderer;
		this._container = containerSelector;
	}

	addItem(item) {
		this._container.append(item);
	}

	renderItems(items) {
		items.map((item) => {
			this._renderer(item);
		});
	}

	prependItem(item) {
		this._container.prepend(item);
	}
}
