class FormValidator {
  constructor(formObjectSettings, formElementToValidate) {
    this._formSelector = formObjectSettings.formSelector;
    this._inputSelector = formObjectSettings.inputSelector;
    this._submitButtonSelector = formObjectSettings.submitButtonSelector;
    this._inactiveButtonStateClass =
      formObjectSettings.inactiveButtonStateClass;
    this._inputErrorClass = formObjectSettings.inputErrorClass;
    this._inputErrorMessageClass = formObjectSettings.inputErrorMessageClass;
    this._formElementToValidate = formElementToValidate;
    this._formObjectSettings = formObjectSettings;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._formObjectSettings.inputErrorClass); //Aplica una clase CSS que resalta el input como inválido (por ejemplo, borde rojo)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formObjectSettings.inputErrorMessageClass); //Aplica una clase CSS que hace visible el mensaje de error, si estaba oculto antes.
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._formObjectSettings.inputErrorClass);
    errorElement.classList.remove(
      this._formObjectSettings.inputErrorMessageClass
    );
    errorElement.textContent = "";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._formObjectSettings.inactiveButtonStateClass
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._formObjectSettings.inactiveButtonStateClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElementToValidate.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElementToValidate.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElementToValidate.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
