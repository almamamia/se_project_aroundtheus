// enabling validation by calling enableValidation()
// pass all the settings on call

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//want to create a global validation functions to check inputs

const showInputError = (formElement, inputElement, settings) => {
  const { inputErrorClass } = settings;
  const { errorClass } = settings;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

//isValid fuction-only for input element

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

//toggling button based on the input validity - checking for all the fields of the form

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//modifying buttton based on the validity of the form

const toggleSubmitButton = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//adding handlers to all form fields

const setEventListeners = (formElement, settings) => {
  //const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const { inputSelector } = settings;
  const { submitButtonSelector } = settings;
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleSubmitButton(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);

      toggleSubmitButton(inputList, buttonElement, settings);
    });
  });
};

//adding handlers to all forms

const enableValidation = (settings) => {
  //const formList = Array.from(document.querySelectorAll(".modal__form"));
  const formList = [...document.querySelectorAll(settings.formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation(settings);
