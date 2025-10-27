import FormValidator from "./FormValidator.js";

const settingsObject = {
  formSelector: ".form", //selector del formulario en específico (acerca de mi o nueva tarjeta) que queremos validar.
  inputSelector: ".form__input", //selector de cada campo de entrada específico de texto en los formularios(inputs), (nombre, URL, etc.)
  submitButtonSelector: ".form__submit", //selector del botón "submit" o "enviar" de cada formulario.
  inactiveButtonStateClass: ".form__submit_inactive", //clase que habilita o deshabilita el botón de "enviar"
  imputErrorClass: ".form__input_type_error", //clase que marca visualmente los campos que tienen O no tienen errores(p.e: borde rojo).
  inputErrorMessageClass: ".form__input-error_active", //clase que muestra o esconde el mensaje de error debajo del input.
};

document.addEventListener("DOMContentLoaded", function () {
  const showInputError = (inputElement, errorMessage) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  };

  const hideInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  };

  const isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("form__submit_inactive");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove("form__submit_inactive");
      buttonElement.disabled = false;
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };

  enableValidation();
});
