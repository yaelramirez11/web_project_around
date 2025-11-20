export function openImagePopup(name, link) {
  const imagePopup = document.querySelector(".popup_show-image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__image-caption");

  popupImage.alt = name;
  popupImage.src = link;
  popupCaption.textContent = name;
  imagePopup.style.display = "flex";
}

export function closeImagePopup() {
  const imagePopup = document.querySelector(".popup_show-image");
  const popupCloseButton = imagePopup.querySelector(
    ".popup__close-button, .popup__close-button-image"
  );
  popupCloseButton.addEventListener("click", function () {
    imagePopup.style.display = "none";
  });
}

export function enablePopupCloseOnOverlay() {
  // selecciona todos los popups de la página y para cada uno de ellos...
  document.querySelectorAll(".popup").forEach((popup) => {
    //almacenamos los datos del popup en la constante "content"
    const content = popup.querySelector(
      ".popup__content, .popup__content-show-image"
    );
    // Añadimos el evento de click para todos los popups
    popup.addEventListener("click", (event) => {
      // Si el contenido del popup NO contiene el "target" donde se realizó el evento...
      if (!content.contains(event.target)) {
        //Cerrar popup al hacer clic fuera del contenido
        popup.style.display = "none";
      }
    });
  });
}

export function enablePopupCloseOnEsc() {
  //añadimos un evento que detecte todas las teclas presionadas en la página
  document.addEventListener("keydown", (event) => {
    //si la tecla presionada es estrictamente igual a "Escape"
    if (event.key === "Escape") {
      // entonces seleccionamos todos los popups de la página y para cada uno de ellos...
      document.querySelectorAll(".popup").forEach((popup) => {
        //comprobamos que si el popup es visible actualmente...
        if (popup.style.display === "flex") {
          //lo cierre.
          popup.style.display = "none";
        }
      });
    }
  });
}
