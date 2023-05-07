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
//profile edit elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const porfileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = porfileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#form-input-name");
const profileDescriptionInput = document.querySelector(
  "#form-input-description"
);
const profileEditForm = porfileEditModal.querySelector(".modal__form");

//add-card elements
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseBtn = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardModal.querySelector(".modal__input-title");
const cardImageInput = addCardModal.querySelector(".modal__input-link");

//card elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

//Preview Image Modal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageCloseBtn = previewImageModal.querySelector(".modal__close");

//================functions======================\\
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
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
  const previewImageLink = previewImageModal.querySelector(
    ".modal__preview-image"
  );
  const previewImageName = previewImageModal.querySelector(
    ".modal__preview-name"
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
    openModal(previewImageModal);
  });

  return cardElement;
}

//event handlers
function fillProfileForm(e) {
  console.log(profileName.textContent);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(porfileEditModal);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(porfileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
}

//==============================event listeners===========================\\
//profile edit
profileEditBtn.addEventListener("click", openEditProfileModal);

profileCloseBtn.addEventListener("click", () => {
  closeModal(porfileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//add new card
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

//preview image
previewImageCloseBtn.addEventListener("click", () => {
  closeModal(previewImageModal);
});
