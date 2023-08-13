import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit, loadingText) {
    super({ popupSelector });
    this._popupConfirm = this._popupElement.querySelector(".popup__container");
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popupConfirm.querySelector(
      ".popup__confirm-button"
    );
    this._defaultTextOnButton = this._submitButton.textContent;
    this._loadingText = loadingText;
  }

  setEventListeners() {
    super.setEventListeners();

    //when form is submitted, make getInputValues to fire
    this._popupConfirm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  showLoading() {
    this._submitButton.textContent = this._loadingText;
  }

  hideLoading() {
    this._submitButton.textContent = this._defaultTextOnButton;
  }
}
