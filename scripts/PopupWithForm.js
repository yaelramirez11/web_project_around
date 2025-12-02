import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form"); //busca dentro del popup el <form>
    this._inputList = this._form.querySelectorAll(".form__input"); //buscar dentro de dicho <form>, sus respectivos inputs
    this._submitButton = this._form.querySelector(".form__submit");
    this._defaultButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {}; //objeto vacío, donde guardaremos a todos los inputs
    this._inputList.forEach((input) => {
      //para cada input del formulario
      formValues[input.name] = input.value; //guardaremos la pareja (nombre y valor del input)
    });
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      //escuchamos el envío del formulario
      event.preventDefault();
      const inputValues = this._getInputValues(); //después de escuchar, obtenemos los datos del formulario
      this.renderLoadingMessage(true); // Mostrar mensaje de cargando...
      this._handleFormSubmit(inputValues)
        .then(() => {
          this.close(); // Cerrar solo si la operación fue exitosa
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.renderLoadingMessage(false); //Esto simplemente restaura el botón
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoadingMessage(isLoading, loadingMessage = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingMessage;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }
}
