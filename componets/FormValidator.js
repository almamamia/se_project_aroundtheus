export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;

    // _setEvenetListeners(){

    // }

    // enableValidation(){
    //   this_form.addEventListener("submit", (evt) => {
    //     evt.preventDefault();
    //   });
    //   setEventListeners(this._form, settings);
  }
}

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
