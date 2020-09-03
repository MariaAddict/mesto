export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItem(data) {
        this._container.append(data);
    }

    addItem(data) {
        this._container.prepend(data);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}