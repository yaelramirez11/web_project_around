import Card from "./Card.js"; // importar el archivo Card.js antes del DOM, pero su contenido se incluye dentro del DOM mas abajo en el código.
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import settingsObject from "./validate.js";

const initialCards = [
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
];

const userInfo = new UserInfo({
  usernameSelector: ".profile__username",
  userjobSelector: ".profile__about-me",
}); //se llaman a los parámetros del constructor

const popupEditProfile = new PopupWithForm(".popup", (formData) => {
  // Este es mi handleFormSubmit
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.about,
  });
});
const buttonEditProfile = document.querySelector(".profile__edit-info"); //se llama al botón
buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo(); //se llama al método dentro de userInfo ANTES de abrir el Form para que devueva los datos actuales del usuario al abrir el Form.
  const form = document.querySelector(".form"); //buscamos el fomulario
  form.querySelector(".form__input_name").value = userData.name; //y dentro de él, buscamos los inputs y les añadimos el valor.
  form.querySelector(".form__input_about").value = userData.job;
  popupEditProfile.open(); //Todo esto hace que busque el nombre de clase que tiene el botón y le agrega un evento de click para que abra el popup.
});
popupEditProfile.setEventListeners();

// Seleccionamos el formulario del primer popup (editar perfil) llamando a "form" en HTML
const editProfileForm = document.querySelector(".form");
const editProfileFormValidator = new FormValidator(
  settingsObject,
  editProfileForm
);
// Activamos la validación
editProfileFormValidator.enableValidation();

const popupAddCard = new PopupWithForm(".popup_add-card", (formCardData) => {
  const newCardData = {
    name: formCardData.title,
    link: formCardData.link,
  };
  const newCard = new Card(newCardData, ".card-template", handleCardClick);
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});
const buttonAddCard = document.querySelector(".profile__add-profile"); //igual aquí, se llama al botón
buttonAddCard.addEventListener("click", () => {
  popupAddCard.open();
});
popupAddCard.setEventListeners();
//Nuevamente instancia de FormValidator
const addCardForm = document.querySelector(".popup_add-card");
const addCardFormValidator = new FormValidator(settingsObject, addCardForm);
addCardFormValidator.enableValidation();

const openImagesPopup = new PopupWithImage(".popup_show-image");
openImagesPopup.setEventListeners();

function handleCardClick(name, link) {
  openImagesPopup.open(name, link);
}
// Función renderer que crea cada tarjeta (instancia de Card), que será utilizada en la instancia de Section (parámetro renderer del objeto en su constructor).
const createCard = (cardData) => {
  const card = new Card(cardData, ".card-template", handleCardClick);
  return card.generateCard();
};
// Crear instancia de Section, llamando a createCard (que es la función renderer)
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards-container"
);
// 3. Renderizar todas las tarjetas en el sitio web
cardSection.renderItems();
