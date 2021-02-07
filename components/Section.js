export default class Section {
	constructor({ data, renderer }, containerSelector) {
		this._renderedItems = data;
		this._renderer = renderer;
		this._container = containerSelector;
	}

	addItem(item) {
		this._container.append(item);
	}

	renderItems() {
		this._renderedItems.map((item) => {
			this._renderer(item);
		});
	}
}
