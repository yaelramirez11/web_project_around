export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form"); //busca dentro del popup el <form>
    this._inputList = this._form.querySelectorAll(".form__input"); //los inputs de dicho formulario
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
      this._handleFormSubmit(inputValues); //y ejecutamos la función de callback que pasamos desde afuera
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
