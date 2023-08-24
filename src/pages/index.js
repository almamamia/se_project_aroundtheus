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

//======================= Create Card Instance =====================\\
function createCard(data) {
  const cardElement = new Card(
    {
      cardData: data,
      handleCardClick: (cardImage) => {
        previewImagePopup.open(cardImage);
      },
      handleDeleteSubmit: (cardID) => {
        deleteCardPopup.setSubmitAction(() => {
          deleteCardPopup.showLoading();
          api
            .deleteCard(cardID)
            .then(() => {
              cardElement._handleDeleteButton();
              deleteCardPopup.close();
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              deleteCardPopup.hideLoading();
            });
        });
        deleteCardPopup.open();
      },
      handleCardLike: (cardID) => {
        if (cardElement._cardIsLiked) {
          return api
            .unlikeCard(cardID)
            .then((res) => {
              cardElement.updateIsLiked(res.isLiked);
            })
            .catch((err) => console.error(err));
        } else {
          return api
            .likeCard(cardID)
            .then((res) => {
              cardElement.updateIsLiked(res.isLiked);
            })
            .catch((err) => console.error(err));
        }
      },
    },
    ".card-template_type_default"
  );
  return cardElement.generateCard();
}

//======================= Render initial cards =====================\\
const cardListEl = document.querySelector(".cards__list");
let userID;
let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, initialCards]) => {
    //set UI
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setAvatar(user.avatar);
    userID = user._id;

    //create a section of cards
    cardSection = new Section(
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
  })
  .catch((err) => console.error(err));

//============================= POPUPS =========================\\
// previw image popup
const previewImagePopup = new PopupWithImage("#preview-image-popup");
previewImagePopup.close();

// delete card popup
const deleteCardPopup = new PopupConfirm("#delete-card-popup", "Deleting...");
deleteCardPopup.setEventListeners();

// Add new card popup
const addCardBtn = document.querySelector(".profile__add-button");

const addCardPopup = new PopupWithForm(
  "#add-card-popup",
  //handleFormSumit
  (cardData) => {
    addCardPopup.showLoading();
    api
      .addNewCard(cardData)
      .then((inputData) => {
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

addCardPopup.setEventListeners();

// Edit Profile Avatar popup
const avatarEditButton = document.querySelector(".profile__image-overlay");

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-popup",
  (inputValues) => {
    editAvatarPopup.showLoading();
    api
      .updateProfilePic(inputValues)
      .then(() => {
        userInfo.setAvatar(inputValues.link);
        editAvatarPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        editAvatarPopup.hideLoading();
      });
  },
  "Saving..."
);

avatarEditButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

editAvatarPopup.setEventListeners();
//======================= Profile Edit Form =====================\\
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
      .editProfile(data)
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

//============================== Validation ===========================\\
const formList = [
  ...document.querySelectorAll(validationSettings.formSelector),
];

formList.forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
});
