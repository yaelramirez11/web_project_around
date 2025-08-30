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

const cardsContainer = document.querySelector("cards-container");

function createCard(cardData) {
  const cardSpot = document.createElement("div");
  cardSpot.classList.add("element");

  const cardRectangle = document.createElement("div");
  cardRectangle.classList.add("element__rectangle");

  const cardImage = document.createElement("img");
  cardImage.classList.add("element__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardInformation = document.createElement("div");
  cardInformation.classList.add("element__info");

  const cardText = document.createElement("p");
  text.textContent = cardData.name;
  cardText.classList.add("element__text");

  const cardLikeButton = document.createElement("button");
  cardLikeButton.classList.add("element__button");

  const cardLikeButtonImage = document.createElement("img");
  cardLikeButtonImage.src = "./images/cardLikeButton.png";
  cardLikeButtonImage.alt = "botón de me gusta";
  cardLikeButtonImage.classList.add("element__button_image");

  cardSpot.appendChild(cardRectangle);
  cardRectangle.appendChild(cardImage);
  cardRectangle.appendChild(cardInformation);
  cardInformation.appendChild(cardText);
  cardInformation.appendChild(cardLikeButton);
  cardLikeButton.appendChild(cardLikeButtonImage);

  return cardSpot;

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.appendChild(cardElement);
  });
}
