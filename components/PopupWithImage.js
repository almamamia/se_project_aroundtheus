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

  open(cardImage) {
    this._previewImage.src = cardImage.link;
    this._previewImage.alt = cardImage.name;
    this._previewName.textContent = cardImage.name;
    super.open();
  }
}
