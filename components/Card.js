import { openPopup } from "../utils/utils.js";

//========================Preview Image Popup==========================\\
// const previewImagePopup = document.querySelector("#preview-image-popup");
// const previewImage = previewImagePopup.querySelector(".popup__preview-image");

//========================Card Class==========================\\

export default class Card {
  constructor({ name, link }, cardSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //=================Event Handlers==========================\\
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handlePreviewImage() {
  //   previewImage.src = this._link;
  //   previewImage.alt = this._name;
  //   previewImagePopup.querySelector(".popup__preview-name").textContent =
  //     this._name;
  //   openPopup(previewImagePopup);
  // }

  //=================Event Listeners==========================\\
  _setEvenetListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  //=============Generate Card==========================\\
  generateCard() {
    //get the card template
    this._cardElement = this._getTemplate();
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");

    //add data
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    //set event listeners
    this._setEvenetListeners();

    //return the card
    return this._cardElement;
  }
}
