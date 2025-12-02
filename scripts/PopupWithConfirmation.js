import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form_type_confirm"); // Seleccionamos el formulario dentro del popup
    this._submitAction = null; //Y aquí guardamos la acción del usuario
  }

  // Recibe la acción que se ejecutará cuando el usuario confirme
  setSubmitAction(action) {
    this._submitAction = action;
  }

  open() {
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._submitAction) {
        this._submitAction();
      }
      this.close();
    });
  }
}
