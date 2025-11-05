export default class UserInfo {
  constructor({ usernameSelector, userjobSelector }) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userjobElement = document.querySelector(userjobSelector);
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      job: this._userjobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._usernameElement.textContent = name;
    this._userjobElement.textContent = job;
  }
}
