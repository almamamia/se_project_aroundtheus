import * as utils from "../utils/utils.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#form-input-name");
const profileDescriptionInput = document.querySelector(
  "#form-input-description"
);
const profileEditForm = document.forms["profile-form"];

//add-card elements
const addCardBtn = document.querySelector(".profile__add-button");
const addCardForm = document.forms["card-form"];

//=======================REFACTORING=====================\\
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
//======================= Preview Image popup =====================\\

const previewImagePopup = new PopupWithImage("#preview-image-popup", () => {});
previewImagePopup.close();

//=======================Render initial cards=====================\\
//create a card instance
function createCard(data) {
  const cardElement = new Card({ data }, ".card-template_type_default", {
    handleCardClick: (cardImage) => {
      previewImagePopup.open(cardImage);
    },
  });
  //console.log(cardElement);
  return cardElement.generateCard();
}
//card elements
const cardListEl = document.querySelector(".cards__list");

//create a section of cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      //cardListEl.prepend(cardElement);
    },
  },
  cardListEl
);

console.log(cardSection);
//render initial cards
cardSection.renderItems(initialCards);

//=======================Add a new card=====================\\
const addCardPopup = new PopupWithForm("#add-card-popup", (data) => {
  //create a new card
  const newCard = createCard(cardData);

  addCardPopup.close();
  cardSection.addItem(newCard);
});

addCardBtn.addEventListener("click", () => {
  addCardPopup.reset();
  addCardPopup.open();
});
addCardPopup.setEventListeners(); //handles submit

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

//=======================Profile Edit Form=====================\\
const profileEditBtn = document.querySelector(".profile__edit-button");
const userInfo = new UserInfo(profileName, profileDescription);
const profileEditPopup = new PopupWithForm("#profile-edit-popup", (data) => {
  userInfo.setUserInfo(data.name, data.description);
  profileEditPopup.close();
});

profileEditBtn.addEventListener("click", () => {
  //fill profile Form
  const profileData = userInfo.getUserInfo();
  profileNameInput.value = profileData.name;
  profileDescriptionInput.value = profileData.description;

  //open profile edit Form
  profileEditPopup.open();
});

profileEditPopup.setEventListeners(); //handles submit

//====================== OLD CODE =====================\\
//==============================event listeners===========================\\
//profile edit
// profileEditBtn.addEventListener("click", openEditProfilePopup);
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//=================RENDER CARD=======================================\\

// initialCards.forEach((item) => {
//   //create a card instance
//   const card = createCard(item, ".card-template_type_default");
//   //fill up the card and return it
//   const cardElement = card.generateCard();
//   //add it to the DOM
//   cardListEl.prepend(cardElement);
// });

// function renderNewCard(cardData, cardList) {
//   const card = createCard(cardData, ".card-template_type_default");
//   const cardElement = card.generateCard();

//   cardList.prepend(cardElement);
// }

//add new card
// addCardBtn.addEventListener("click", () => {
//   utils.openPopup(addCardPopup);
// });
// addCardForm.addEventListener("submit", handleAddCardSubmit);

// function handleAddCardSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardImageInput.value;
//   renderNewCard({ name, link }, cardListEl);
//   utils.closePopup(addCardPopup);

//   addCardForm.reset();
// }

// function fillProfileForm(e) {
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// }

// function openEditProfilePopup() {
//   fillProfileForm();
//   utils.openPopup(profileEditPopup);
// }

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileName.textContent = profileNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   utils.closePopup(profileEditPopup);
// }
