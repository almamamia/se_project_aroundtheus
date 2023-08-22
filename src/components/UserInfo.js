export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    //returns the object with info about the user
    const userData = {};
    userData["profileName"] = this._name.textContent;
    userData["profileAbout"] = this._about.textContent;
    return userData;
  }

  setUserInfo(name, about) {
    //takes new user data and adds on the the page
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setAvatar(link) {
    const profileAvatar = document.querySelector(".profile__image");
    profileAvatar.src = link;
  }
}
