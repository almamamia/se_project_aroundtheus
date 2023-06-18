export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEvenetListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    //popups
    const previewImagePopup = document.querySelector("#preview-image-popup");
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        previewImagePopup.querySelector(".popup__preview-image").src =
          this._link;
        previewImagePopup.querySelector(".popup__preview-image").alt =
          this._name;
        previewImagePopup.querySelector(".popup__preview-name").textContent =
          this._name;
        this._openPopup(previewImagePopup);
      });
  }

  _openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        popup.classList.remove("popup_opened");
      }
    });
  }

  _handleLikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  generateCard() {
    //get the card template
    this._cardElement = this._getTemplate();

    //add data
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    //set event listeners
    this._setEvenetListeners();

    //return the card
    return this._cardElement;
  }
}
