import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import * as utils from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//========================elements==========================\\

const popups = document.querySelectorAll(".popup");

//profile edit elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#form-input-name");
const profileDescriptionInput = document.querySelector(
  "#form-input-description"
);
const profileEditForm = document.forms["profile-form"];

//add-card elements
const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#add-card-popup");
const addCardForm = document.forms["card-form"];
const cardTitleInput = addCardPopup.querySelector(".popup__input-title");
const cardImageInput = addCardPopup.querySelector(".popup__input-link");

//card elements
const cardListEl = document.querySelector(".cards__list");

//================functions======================\\

function renderNewCard(cardData, wrapper) {
  const card = new Card(cardData, ".card-template_type_default");
  const cardElement = card.generateCard();
  wrapper.prepend(cardElement);
}

function fillProfileForm(e) {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfilePopup() {
  fillProfileForm();
  utils.openPopup(profileEditPopup);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  utils.closePopup(profileEditPopup);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderNewCard({ name, link }, cardListEl);
  utils.closePopup(addCardPopup);

  addCardForm.reset();
}

//==============================Validation===========================\\
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formList = [...document.querySelectorAll(settings.formSelector)];

formList.forEach((form) => {
  const formValidator = new FormValidator(settings, form);

  formValidator.enableValidation();
});

//==============================event listeners===========================\\
//profile edit
profileEditBtn.addEventListener("click", openEditProfilePopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//add new card
addCardBtn.addEventListener("click", () => {
  utils.openPopup(addCardPopup);
});
addCardForm.addEventListener("submit", handleAddCardSubmit);

//combining overlay and close button listener
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      utils.closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      utils.closePopup(popup);
    }
  });
});

//=================RENDER CARD=======================================\\

initialCards.forEach((item) => {
  //create a card instance
  const card = new Card(item, ".card-template_type_default");
  //fill up the card and return it
  const cardElement = card.generateCard();

  //add it to the DOM
  cardListEl.prepend(cardElement);
});
