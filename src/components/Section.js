export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItem(data) {
        this._container.append(data);
    }

    addItem(data) {
        this._container.prepend(data);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}