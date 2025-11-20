import Card from "./Card.js"; // importar el archivo Card.js antes del DOM, pero su contenido se incluye dentro del DOM mas abajo en el código.
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import settingsObject from "./validate.js";

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

const userInfo = new UserInfo({
  usernameSelector: ".profile__username",
  userjobSelector: ".profile__about-me",
}); //se llaman a los parámetros del constructor
const userData = userInfo.getUserInfo(); //y se llama al método dentro de userInfo que devueva los datos actuales del usuario al abrir el Form.
settingsObject.value = userData.name;
settingsObject.value = userData.job;

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
