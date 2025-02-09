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
    let button = event.target;
    let currentBackground = window.getComputedStyle(button).backgroundImage;
    if (currentBackground.includes("btn-like-nr.png")) {
      button.style.backgroundImage = 'url("./images/btn-like-ac.png")';
    } else {
      button.style.backgroundImage = 'url("./images/btn-like-nr.png")';
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
});
