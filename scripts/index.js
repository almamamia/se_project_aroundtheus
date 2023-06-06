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
const profileCloseBtn = profileEditPopup.querySelector(".popup__close");
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
const addCardCloseBtn = addCardPopup.querySelector(".popup__close");
const addCardForm = document.forms["card-form"];
const cardTitleInput = addCardPopup.querySelector(".popup__input-title");
const cardImageInput = addCardPopup.querySelector(".popup__input-link");
const cardSubmitBtn = addCardForm.querySelector(".popup__button");

//card elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

//Preview Image popup
const previewImagePopup = document.querySelector("#preview-image-popup");
const previewImageCloseBtn = previewImagePopup.querySelector(".popup__close");

//================functions======================\\

function closeByEsacpe(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsacpe);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsacpe);
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

  //ended up doing this on the toggleSumbitButton function
  // if (cardTitleInput.value === "" && cardImageInput.value === "") {
  //   cardSubmitBtn.classList.add("popup__button_disabled");
  //   cardSubmitBtn.disabled = true;
  // }
}

//==============================event listeners===========================\\
//profile edit
profileEditBtn.addEventListener("click", openEditProfilePopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//add new card
addCardBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});
addCardForm.addEventListener("submit", handleAddCardSubmit);
initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

//combining overlay and close button listener
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
