const profileEditPopup = document.querySelector("#profile-edit-popup");

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

export {
  closeByEsacpe,
  closePopup,
  openPopup,
  renderCard,
  fillProfileForm,
  openEditProfilePopup,
  handleProfileEditSubmit,
  handleAddCardSubmit,
};
