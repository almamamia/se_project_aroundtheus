import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, loadingText) {
    super({ popupSelector });
    this._popupConfirm = this._popupElement.querySelector(".popup__container");

    this._confirmButton = this._popupConfirm.querySelector(
      ".popup__confirm-button"
    );
    this._defaultTextOnButton = this._confirmButton.textContent;
    this._loadingText = loadingText;
  }

  setSubmitAction(callback) {
    this._handleSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }

  showLoading() {
    this._confirmButton.textContent = this._loadingText;
  }

  hideLoading() {
    this._confirmButton.textContent = this._defaultTextOnButton;
  }
}
