import { initialCards, validationSettings } from "../utils/utils.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//============================== Validation ===========================\\
const formList = [
  ...document.querySelectorAll(validationSettings.formSelector),
];

formList.forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);

  formValidator.enableValidation();
});

//======================= Preview Image popup =====================\\

const previewImagePopup = new PopupWithImage("#preview-image-popup");
previewImagePopup.close();

//======================= Render initial cards =====================\\
const cardListEl = document.querySelector(".cards__list");

//create a card instance
function createCard(data) {
  const cardElement = new Card(
    {
      cardData: data,
      handleCardClick: (cardImage) => {
        previewImagePopup.open(cardImage);
      },
    },
    ".card-template_type_default"
  );
  return cardElement.generateCard();
}

//create a section of cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  cardListEl
);

//render initial cards
cardSection.renderItems(initialCards);

//======================= Add a new card =====================\\
const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = new PopupWithForm("#add-card-popup", (inputData) => {
  //create a new card
  const newCard = createCard(inputData);
  addCardPopup.close();
  cardSection.addItem(newCard);
});

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

//handle submit
addCardPopup.setEventListeners();

//======================= Profile Edit Form =====================\\
//profile edit elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#form-input-name");
const profileDescriptionInput = document.querySelector(
  "#form-input-description"
);

const profileEditBtn = document.querySelector(".profile__edit-button");
const userInfo = new UserInfo(profileName, profileDescription);

const profileEditPopup = new PopupWithForm("#profile-edit-popup", (data) => {
  userInfo.setUserInfo(data.name, data.description);
  profileEditPopup.close();
});

profileEditBtn.addEventListener("click", () => {
  //fill profile Form
  const profileData = userInfo.getUserInfo();

  profileNameInput.value = profileData.profileName;
  profileDescriptionInput.value = profileData.profileDescription;

  profileEditPopup.open();
});

//handle submit
profileEditPopup.setEventListeners();
