const yosemiteValleyImage = new URL("../images/yosemite.jpg", import.meta.url);
const lakeLouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const baldMountainsImage = new URL(
  "../images/bald-mountains.jpg",
  import.meta.url
);
const latemarImage = new URL("../images/latemar.jpg", import.meta.url);
const vanoiseNationalParkImage = new URL(
  "../images/vanoise.jpg",
  import.meta.url
);
const lagoDiBraiesImage = new URL("../images/lago.jpg", import.meta.url);

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: yosemiteValleyImage,
  },
  {
    name: "Lake Louise",
    link: lakeLouiseImage,
  },
  {
    name: "Bald Mountains",
    link: baldMountainsImage,
  },
  {
    name: "Latemar",
    link: latemarImage,
  },
  {
    name: "Vanoise National Park",
    link: vanoiseNationalParkImage,
  },
  {
    name: "Lago di Braies",
    link: lagoDiBraiesImage,
  },
];

export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
