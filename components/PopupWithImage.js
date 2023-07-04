import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".popup__preview-image"
    );
    this._previewName = this._popupElement.querySelector(
      ".popup__preview-name"
    );

    super.setEventListeners();
  }

  open(name, link) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewName.textContent = name;
    super.open();
  }
}
