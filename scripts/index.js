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

const popupContainer = document.querySelectorAll(".popup__container");

//profile edit elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const profileCloseBtn = profileEditPopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#form-input-name");
const profileDescriptionInput = document.querySelector(
  "#form-input-description"
);
const profileEditForm = profileEditPopup.querySelector(".popup__form");

//add-card elements
const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#add-card-popup");
const addCardCloseBtn = addCardPopup.querySelector(".popup__close");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardTitleInput = addCardPopup.querySelector(".popup__input-title");
const cardImageInput = addCardPopup.querySelector(".popup__input-link");

//card elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

//Preview Image popup
const previewImagePopup = document.querySelector("#preview-image-popup");
const previewImageCloseBtn = previewImagePopup.querySelector(".popup__close");

//================functions======================\\
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const previewImageLink = previewImagePopup.querySelector(
    ".popup__preview-image"
  );
  const previewImageName = previewImagePopup.querySelector(
    ".popup__preview-name"
  );
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", () => {
    previewImageLink.src = cardData.link;
    previewImageLink.alt = cardData.name;
    previewImageName.textContent = cardData.name;
    openPopup(previewImagePopup);
  });

  return cardElement;
}

//event handlers
function fillProfileForm(e) {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfilePopup() {
  fillProfileForm();
  openPopup(profileEditPopup);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardPopup);
  addCardForm.reset();
}

//==============================event listeners===========================\\
//profile edit

profileEditBtn.addEventListener("click", openEditProfilePopup);

profileCloseBtn.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//add new card
addCardBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});

addCardCloseBtn.addEventListener("click", () => {
  closePopup(addCardPopup);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

//preview image
previewImageCloseBtn.addEventListener("click", () => {
  closePopup(previewImagePopup);
});

//close Popups
function overlayClosePopup(formElement) {
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__opened")
    ) {
      closePopup(e.target);
    }
  });
}

overlayClosePopup();
