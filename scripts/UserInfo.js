export default class UserInfo {
  constructor({ usernameSelector, userjobSelector }) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userjobElement = document.querySelector(userjobSelector);
  }

  getUserInfo() {
    //Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto.
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
