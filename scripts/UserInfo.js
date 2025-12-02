export default class UserInfo {
  constructor({ usernameSelector, userjobSelector, userAvatarSelector }) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userjobElement = document.querySelector(userjobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    //Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto.
    return {
      name: this._usernameElement.textContent,
      job: this._userjobElement.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._usernameElement.textContent = name;
    this._userjobElement.textContent = job;
    this._userAvatarElement.src = avatar;
  }

  setUserAvatar(avatarLink) {
    this._userAvatarElement.src = avatarLink;
  }
}
