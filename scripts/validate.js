import FormValidator from "./FormValidator.js";

const settingsObject = {
  formSelector: ".form", //selector del formulario en específico (acerca de mi o nueva tarjeta) que queremos validar.
  inputSelector: ".form__input", //selector de cada campo de entrada específico de texto en los formularios(inputs), (nombre, URL, etc.)
  submitButtonSelector: ".form__submit", //selector del botón "submit" o "enviar" de cada formulario.
  inactiveButtonStateClass: "form__submit_inactive", //clase que habilita o deshabilita el botón de "enviar"
  inputErrorClass: "form__input_type_error", //clase que marca visualmente los campos que tienen O no tienen errores(p.e: borde rojo).
  inputErrorMessageClass: "form__input-error_active", //clase que muestra o esconde el mensaje de error debajo del input.
};

const allForms = document.querySelectorAll(settingsObject.formSelector);
allForms.forEach((formElement) => {
  const formValidator = new FormValidator(settingsObject, formElement);
  formValidator.enableValidation();
});
