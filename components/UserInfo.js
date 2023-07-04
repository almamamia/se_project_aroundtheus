export default class UserInto {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    //returns the object with info about the user
    const userData = {};
    userData["profileName"] = this._name.textContent;
    userData["profileDescription"] = this._description.textContent;
    return userData;
  }

  setUserInfo(name, description) {
    //takes new user data and adds on the the page
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
