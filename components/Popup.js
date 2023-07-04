export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = this._popupElement.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
  }

  _handleDeleteButton() {
    this._popupElement.remove();
    this._popupElement = null;
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);

    this._deleteButton = this._popupElement.querySelector(".popup__close");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton;
    });
  }
}
