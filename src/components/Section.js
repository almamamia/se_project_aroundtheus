export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = cardSelector;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardSelector.prepend(element);
  }
}
