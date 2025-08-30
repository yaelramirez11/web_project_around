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

    const cardElement = createCard(newCard);
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

  function createCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("element");

    const cardRectangle = document.createElement("div");
    cardRectangle.classList.add("element__rectangle");

    const cardImage = document.createElement("img");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardImage.classList.add("element__image");

    const cardInformation = document.createElement("div");
    cardInformation.classList.add("element__info");

    const cardText = document.createElement("p");
    cardText.textContent = cardData.name;
    cardText.classList.add("element__text");

    const cardLikeButton = document.createElement("button");
    cardLikeButton.classList.add("element__button");

    const cardLikeButtonImage = document.createElement("img");
    cardLikeButtonImage.src = "./images/Like.png";
    cardLikeButtonImage.alt = "botón de me gusta";
    cardLikeButtonImage.classList.add("element__button-image");

    card.appendChild(cardRectangle);
    cardRectangle.appendChild(cardImage);
    cardRectangle.appendChild(cardInformation);
    cardInformation.appendChild(cardText);
    cardInformation.appendChild(cardLikeButton);
    cardLikeButton.appendChild(cardLikeButtonImage);

    cardLikeButton.addEventListener("click", like);

    return card;
  }

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.appendChild(cardElement);
  });
});
