export default class Popup {
  //esta clase unicamente abre y cierra la ventana emergente
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    if (!this._popup) return; //primero me aseguro de que el popup exista
    this._popup.classList.add("popup_is-opened");
    this._boundToEscHandler = this._handleEscClose.bind(this);
    document.addEventListener("keydown", this._boundToEscHandler); //se escucha la tecla Esc solo mientras el popup esté abierto
  }
  close() {
    if (!this._popup) return;
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._boundToEscHandler);
    this._boundToEscHandler = null; //para limpiarlo (no obligatorio)
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-button"); //buscamos el botón de cerrar
    if (closeButton) {
      //si existe...
      closeButton.addEventListener("click", () => {
        this.close(); //llamamos a close()
      });
    }
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
