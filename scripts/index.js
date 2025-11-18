import Card from "./Card.js"; // importar el archivo Card.js antes del DOM, pero su contenido se incluye dentro del DOM mas abajo en el código.
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import {
  openImagePopup,
  closeImagePopup,
  enablePopupCloseOnEsc,
  enablePopupCloseOnOverlay,
} from "./utils.js";

//CREACIÓN DE INSTANCIAS
const userInfo = new UserInfo({
  //primera instancia creada
  usernameSelector: ".profile__username",
  userjobSelector: ".profile__about-me",
}); //se llaman a los parámetros del constructor
const userData = userInfo.getUserInfo(); //y se llama al método dentro de userInfo que devueva los datos actuales del usuario
inputName.value = userData.name;
inputAbout.value = userData.job;

function handleFormSubmit(inputValues) {
  console.log("Datos recibidos:", inputValues);
}
const profilePopup = new PopupWithForm(".profile__edit-info", handleFormSubmit);
profilePopup.open();
profilePopup.setEventListeners();

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
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
];
const cardsContainer = document.querySelector(".cards-container");
const imagePopup = document.querySelector(".popup_show-image");
const popupCloseButton = imagePopup.querySelector(".popup__close-button");
popupCloseButton.addEventListener("click", closeImagePopup);
// activamos la función
enablePopupCloseOnOverlay();
//llamámos a la función
enablePopupCloseOnEsc();
initialCards.forEach((cardData) => {
  //el forEach actual convierte initialCards en objetos Card completos, cada uno con su comportamiento y métodos, mientras que el anterior solo creaba elementos sueltos con una función.
  const card = new Card(cardData, ".card-template", openImagePopup, like); //ahora cada tarjeta es un objeto con su propia lógica y no con una función externa (createCard(cardData)), la cuál era una lógica dispersa.
  const cardElement = card.generateCard();
  cardsContainer.appendChild(cardElement);
});
