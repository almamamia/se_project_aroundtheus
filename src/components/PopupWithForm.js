import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, loadingText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._popupInputs = this._popupElement.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._defaultTextOnButton = this._submitButton.textContent;
    this._loadingText = loadingText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object
    //create an empty object to store the input data
    const inputData = {};

    //grab all the inputs and iterate thru to store the data to the object
    this._popupInputs.forEach((input) => {
      inputData[input.name] = input.value;
    });

    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();

    //when form is submitted, make getInputValues to fire
    this._popupForm.addEventListener("submit", (e) => {
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
