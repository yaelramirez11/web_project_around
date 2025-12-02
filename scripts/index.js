import Card from "./Card.js"; // importar el archivo Card.js antes del DOM, pero su contenido se incluye dentro del DOM mas abajo en el código.
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import settingsObject from "./validate.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

let currentUserId; //donde se almacena el id recibido del servidor
let cardSection;
const changeProfilePic = document.querySelector(".profile__change-photo"); //referenciamos el boton de "cambiar foto de perfil"
changeProfilePic.addEventListener("click", () => {
  popupUpdateAvatar.open(); //le añadimos un eventListener de open() para que se abra el popup
});

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "5076d211-3447-4115-b018-7a90a6a8ad2f",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  usernameSelector: ".profile__username",
  userjobSelector: ".profile__about-me",
  userAvatarSelector: ".profile__image",
}); //se llaman a los parámetros del constructor

api
  .getAllData()
  .then(([receivedUserData, receivedCardsData]) => {
    currentUserId = receivedUserData._id;

    userInfo.setUserInfo({
      name: receivedUserData.name,
      job: receivedUserData.about,
      avatar: receivedUserData.avatar,
    });

    const createCard = (cardData) => {
      const card = new Card(
        cardData,
        ".card-template",
        handleCardClick,
        handleDeleteClick,
        currentUserId,
        api
      );
      return card.generateCard();
    };

    cardSection = new Section(
      {
        items: receivedCardsData,
        renderer: createCard,
      },
      ".cards-container"
    );

    cardSection.renderItems();
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const popupUpdateAvatar = new PopupWithForm( //Nueva instancia para el popup de editar Foto
  ".popup_update-avatar", // Este es el popup
  (formData) => {
    return api
      .changePfP(formData.avatar)
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        });
        popupUpdateAvatar.close();
      })
      .catch((err) => console.log("Error al actualizar avatar:", err));
  }
);
popupUpdateAvatar.setEventListeners(); //y setEventListeners() para que herede los demas listeners de la clase Popup (cierre con Esc, overlay, X).

const popupEditProfile = new PopupWithForm(".popup", (formData) => {
  return api
    .updateUserInfo(formData.name, formData.about) //pedimos los datos al servidor y luego los asignamos a los parámetros de name y about en userInfo
    .then((updatedUser) => {
      //pasamos la llamada a una secuencia .then(updatedUser) y este parámetro sustituye al anterior en name y job (formData.name/about)
      userInfo.setUserInfo({
        name: updatedUser.name,
        job: updatedUser.about,
      });
      popupEditProfile.close(); //SOLO HASTA que se envíen exitosamente los datos al servidor, se cierra el Popup
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

const popupAddCard = new PopupWithForm(".popup_add-card", (formCardData) => {
  return api
    .updateCards(formCardData.title, formCardData.link)
    .then((newCardData) => {
      const newCard = new Card(newCardData, ".card-template", handleCardClick);
      const cardElement = newCard.generateCard();
      cardSection.addItem(cardElement);
      popupAddCard.close(); //Igual aquí, se cierra SOLO si la petición fue exitosa
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

const popupConfirm = new PopupWithConfirmation(".popup_confirm-delete");
popupConfirm.setEventListeners();

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
function handleDeleteClick(cardInstance) {
  popupConfirm.setSubmitAction(() => {
    return api
      .deleteCard(cardInstance._id)
      .then(() => {
        cardInstance.removeCard();
        popupConfirm.close();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });

  popupConfirm.open();
}
