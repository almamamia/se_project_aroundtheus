import "../pages/index.css";
import { initialCards, validationSettings } from "../utils/utils.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js";
import API from "../components/API.js";
const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c48cc533-37fe-4aec-bc10-a2c7c93d6979",
    "Content-Type": "application/json",
  },
});

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
    // (cardID) => {
    //   //handleDelete
    //   deleteCardPopup.open();
    //   deleteCardPopup.showLoading();
    //   api
    //     .deleteCard(cardID)
    //     .then(() => cardElement._handleDeleteButton, deleteCardPopup.close());
    // },
    // (cardID) => {
    //   api
    //     .likeCard(cardID)
    //     .then((cardData) => {
    //       console.log(cardData);
    //     })
    //     .catch((err) => console.error(err));
    // },
    // (cardID) => {
    //   api
    //     .unlikeCard(cardID)
    //     .then((cardData) => {
    //       console.log(cardData);
    //     })
    //     .catch((err) => console.error(err));
    // }
  );
  console.log(cardElement);
  return cardElement.generateCard();
}

// 05. delete card popup
const deleteCardBtn = document.querySelectorAll(".card__delete-button");
//console.log(deleteCardBtn);

const deleteCardPopup = new PopupConfirm(
  "#delete-card-popup",
  //handleFormSumit
  (cardData) => {
    deleteCardPopup.showLoading();
    api
      .deleteCard(cardData)
      .then((inputData) => {
        console.log(inputData);
        cardElement._handleDeleteButton;
        deleteCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        deleteCardPopup.hideLoading();
      });
  },
  "Deleting..."
);

//======================= Render user info + cards =====================\\

// deleteCardBtn.addEventListener("click", () => {
//   deleteCardPopup.open();
// });
// create a section of cards
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const cardElement = createCard(data);
//       cardSection.addItem(cardElement);
//     },
//   },
//   cardListEl
// );

//render initial cards
// cardSection.renderItems(initialCards);
//======================= Render initial cards =====================\\
const cardListEl = document.querySelector(".cards__list");
let userID;
let cardSection;

//   01/02 loading user info from the server + getInitialCards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, initialCards]) => {
    //set UI
    userInfo.setUserInfo(user.name, user.about);
    userID = user._id;

    //create a section of cards
    console.log(initialCards);

    cardSection = new Section(
      {
        items: initialCards,
        renderer: createCard,
        // (data) => {
        //   const cardElement = createCard(data);
        //   cardSection.addItem(cardElement);
        // },
      },
      cardListEl
    );

    //render initial cards
    cardSection.renderItems(initialCards);
  })
  .catch((err) => console.error(err));

//======================= Add a new card =====================\\
const addCardBtn = document.querySelector(".profile__add-button");

//   04. add new card popup
const addCardPopup = new PopupWithForm(
  "#add-card-popup",
  //handleFormSumit
  (cardData) => {
    addCardPopup.showLoading();
    api
      .addNewCard(cardData)
      .then((inputData) => {
        console.log(inputData);
        //create a new card
        const newCard = createCard(inputData);
        addCardPopup.close();
        cardSection.addItem(newCard);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        addCardPopup.hideLoading();
      });
  },
  "Creating..."
);

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

const profileEditPopup = new PopupWithForm(
  "#profile-edit-popup",
  //handleFormSumit
  (data) => {
    profileEditPopup.showLoading();
    api
      .editProfile()
      .then(() => {
        userInfo.setUserInfo(data.name, data.description);
        profileEditPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profileEditPopup.hideLoading();
      });
  },
  "Saving..."
);

profileEditBtn.addEventListener("click", () => {
  //fill profile Form
  const profileData = userInfo.getUserInfo();

  profileNameInput.value = profileData.profileName;
  profileDescriptionInput.value = profileData.profileAbout;

  profileEditPopup.open();
});

//handle submit
profileEditPopup.setEventListeners();
