document.addEventListener("DOMContentLoaded", function () {
  let buttonEdit = document.querySelector(".profile__edit-info");
  let buttonAddProfile = document.querySelector(".profile__add-profile");
  let openPopup = document.querySelector(".popup");
  let buttonClose = document.querySelector(".popup__close");
  let closePopup = document.querySelector(".popup");
  let buttonsLike = document.querySelectorAll(".element__button");
  let inputName = document.querySelector(".form__input_name");
  let inputAbout = document.querySelector(".form__input_about");
  let textTitle = document.querySelector(".profile__username");
  let textText = document.querySelector(".profile__about-me");
  let buttonSubmit = document.querySelector(".form__submit");
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
    let currentBackground = window.getComputedStyle(button).backgroundImage;
    if (currentBackground.includes("Like.png")) {
      button.style.backgroundImage = 'url("./images/btn-like-ac.png")';
    } else {
      button.style.backgroundImage = 'url("./images/Like.png")';
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

  buttonEdit.addEventListener("click", open);
  buttonAddProfile.addEventListener("click", open);
  buttonClose.addEventListener("click", close);
  buttonsLike.forEach((button) => {
    button.addEventListener("click", like);
  });
  buttonSubmit.addEventListener("click", handleProfileFormSubmit);

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

    const rectangle = document.createElement("div");
    rectangle.classList.add("element__rectangle");

    const img = document.createElement("img");
    img.src = cardData.link;
    img.alt = cardData.name;
    img.classList.add("element__image");

    const info = document.createElement("div");
    info.classList.add("element__info");

    const text = document.createElement("p");
    text.textContent = cardData.name;
    text.classList.add("element__text");

    const button = document.createElement("button");
    button.classList.add("element__button");

    const buttonImg = document.createElement("img");
    buttonImg.src = "./images/Like.png";
    buttonImg.alt = "botón de me gusta";
    buttonImg.classList.add("element__button-image");

    button.appendChild(buttonImg);
    info.appendChild(text);
    info.appendChild(button);
    rectangle.appendChild(img);
    rectangle.appendChild(info);
    card.appendChild(rectangle);

    return card;
  }

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.appendChild(cardElement);
  });
});
