import Card from "./Card.js";

document.addEventListener("DOMContentLoaded", () => {
  // Botones
  const buttonEdit = document.querySelector(".profile__edit-info");
  const buttonAddProfile = document.querySelector(".profile__add-profile");

  // Popups
  const popupEdit = document.querySelector(".popup");
  const popupAddCard = document.querySelector(".popup_add-card");
  const popupImage = document.querySelector(".popup_show-image");

  // Inputs perfil
  const inputName = document.querySelector(".form__input_name");
  const inputAbout = document.querySelector(".form__input_about");
  const textTitle = document.querySelector(".profile__username");
  const textText = document.querySelector(".profile__about-me");

  // Submit perfil
  const formEdit = popupEdit.querySelector(".form");
  const buttonCloseEdit = popupEdit.querySelector(".popup__close");

  // Inputs tarjeta
  const inputTitle = document.querySelector(".form__input_title");
  const inputLink = document.querySelector(".form__input_link");
  const formAddCard = popupAddCard.querySelector(".form");
  const buttonCloseAddCard = popupAddCard.querySelector(".popup__close");

  // Contenedor tarjetas
  const cardsContainer = document.querySelector(".cards-container");

  // Abrir y cerrar popups
  function openPopup(popup) {
    popup.classList.add("popup_is-opened");
  }
  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
  }

  // Click para abrir edición de perfil
  buttonEdit.addEventListener("click", () => {
    inputName.value = textTitle.textContent;
    inputAbout.value = textText.textContent;
    openPopup(popupEdit);
  });
  buttonCloseEdit.addEventListener("click", () => closePopup(popupEdit));

  // Guardar perfil
  formEdit.addEventListener("submit", (evt) => {
    evt.preventDefault();
    textTitle.textContent = inputName.value;
    textText.textContent = inputAbout.value;
    closePopup(popupEdit);
  });

  // Pop-up tarjeta
  buttonAddProfile.addEventListener("click", () => openPopup(popupAddCard));
  buttonCloseAddCard.addEventListener("click", () => closePopup(popupAddCard));

  // Crear tarjeta (corrección importante)
  function createCard(data) {
    const card = new Card(data, ".element", (name, link) => {
      const img = popupImage.querySelector(".popup__image");
      const caption = popupImage.querySelector(".popup__image-caption");
      img.src = link;
      img.alt = name;
      caption.textContent = name;
      openPopup(popupImage);
    });

    return card.generateCard();
  }

  // Cerrar imagen grande
  popupImage
    .querySelector(".popup__close-button")
    .addEventListener("click", () => {
      closePopup(popupImage);
    });

  // Envío de tarjeta nueva
  formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCard = createCard({
      name: inputTitle.value,
      link: inputLink.value,
    });
    cardsContainer.prepend(newCard);
    closePopup(popupAddCard);
    formAddCard.reset();
  });

  // Tarjetas iniciales
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

  initialCards.forEach((data) => cardsContainer.appendChild(createCard(data)));
});

/* import Card from "./Card.js"; // importar el archivo Card.js antes del DOM, pero su contenido se incluye dentro del DOM mas abajo en el código.
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
document.addEventListener("DOMContentLoaded", function () {
  let buttonEdit = document.querySelector(".profile__edit-info");
  let buttonAddProfile = document.querySelector(".profile__add-profile");
  let openPopup = document.querySelector(".popup");
  let buttonClose = document.querySelector(
    ".popup:not(.popup_add-card) .popup__close"
  );
  let closePopup = document.querySelector(".popup");
  let buttonsLike = document.querySelectorAll(".element__button");
  let inputName = document.querySelector(".form__input_name");
  let inputAbout = document.querySelector(".form__input_about");
  let textTitle = document.querySelector(".profile__username");
  let textText = document.querySelector(".profile__about-me");
  let buttonSubmit = document.querySelector(".form__submit");
  let popupAddCard = document.querySelector(".popup_add-card");
  const buttonAddCardSubmit = popupAddCard.querySelector(".form__submit");
  let buttonCloseAddCard = document.querySelector(
    ".popup_add-card .popup__close"
  );
  let inputTitle = document.querySelector(".form__input_title");
  let inputLink = document.querySelector(".form__input_link");
  const loaderTimeout = 5000;
  function open() {
    if (openPopup.style.display === "none" || openPopup.style.display === "") {
      openPopup.style.display = "flex";
      document.getElementById("loader").style.display = "block";
      document.getElementById("loader__circle").style.display = "none";
      setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("loader__circle").style.display = "block";
        inputName.value = textTitle.textContent;
        inputAbout.value = textText.textContent;
        buttonSubmit.style.backgroundColor = "#000000";
      }, loaderTimeout);
    } else {
      openPopup.style.display = "none";
    }
  }
  function close() {
    if (closePopup.style.display === "flex") {
      closePopup.style.display = "none";
      inputName.value = "";
      inputAbout.value = "";
      buttonSubmit.style.backgroundColor = "#FFFFFF";
    } else {
      closePopup.style.display = "flex";
    }
  }
  function like(event) {
    let button = event.currentTarget;
    let currentBackground = button.querySelector("img");
    if (currentBackground.src.includes("Like.png")) {
      currentBackground.src = "./images/Union.png";
    } else {
      currentBackground.src = "./images/Like.png";
    }
  }
  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    textTitle.textContent = inputName.value;
    textText.textContent = inputAbout.value;
    console.log(inputName.value);
    console.log(inputAbout.value);
    closePopup.style.display = "none";
    inputName.value = "";
    inputAbout.value = "";
    buttonSubmit.style.backgroundColor = "#FFFFFF";
  }
  function openAddCardPopup() {
    popupAddCard.style.display = "flex";
    inputTitle.value = "";
    inputLink.value = "";
  }
  function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
      name: inputTitle.value,
      link: inputLink.value,
    };
    const card = new Card(newCard, ".card-template", openImagePopup, like); //ahora las tarjetas se crean mediante una clase(Card, en Card.js) y no mediante una función(createCard), y recibe múltiples parámetros, haciendo que cada tarjeta sea autónoma sin depender de variables globales.
    const cardElement = card.generateCard(); //ahora todo está encapsulado dentro de Card, usando el método generateCard() para crear tarjetas listas para insertar, haciendo el código mas limpio.
    cardsContainer.prepend(cardElement);
    closeAddCardPopup();
  }
  function closeAddCardPopup() {
    popupAddCard.style.display = "none";
  }
  buttonEdit.addEventListener("click", open);
  buttonClose.addEventListener("click", close);
  buttonsLike.forEach((button) => {
    button.addEventListener("click", like);
  });
  buttonSubmit.addEventListener("click", handleProfileFormSubmit);
  buttonAddProfile.addEventListener("click", openAddCardPopup);
  buttonCloseAddCard.addEventListener("click", closeAddCardPopup);
  buttonAddCardSubmit.addEventListener("click", handleAddCardFormSubmit);
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
}); */
