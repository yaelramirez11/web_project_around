class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  #getTemplate() {
    //aquí, en la función privada getTemplate, se pasó el código completo de la creación de las tarjetas
    const card = document.createElement("div");
    card.classList.add("element");

    const cardRectangle = document.createElement("div");
    cardRectangle.classList.add("element__rectangle");

    const cardImage = document.createElement("img");
    cardImage.src = this._link; //ahora se toman de las propiedades de la instancia de Card, en el constructor.
    cardImage.alt = this._title;
    cardImage.classList.add("element__image");

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link); //igual aquí. En todo usamos this._, propiedades declaradas en el constructor
    });

    const cardInformation = document.createElement("div");
    cardInformation.classList.add("element__info");

    const cardText = document.createElement("p");
    cardText.textContent = this._title; //uso de this._ también aquí.
    cardText.classList.add("element__text");

    const cardLikeButton = document.createElement("button");
    cardLikeButton.classList.add("element__button");

    const cardLikeButtonImage = document.createElement("img");
    cardLikeButtonImage.src = "./images/Like.png";
    cardLikeButtonImage.alt = "botón de me gusta";
    cardLikeButtonImage.classList.add("element__button-image");

    const cardDeleteButton = document.createElement("button");
    cardDeleteButton.classList.add("element__delete-button");

    const cardDeleteButtonImage = document.createElement("img");
    cardDeleteButtonImage.src = "./images/Trash.png";
    cardDeleteButtonImage.alt = "Eliminar tarjeta";
    cardDeleteButtonImage.classList.add("element__delete-button-image");

    card.appendChild(cardRectangle);
    cardRectangle.appendChild(cardImage);
    cardRectangle.appendChild(cardInformation);
    cardInformation.appendChild(cardText);
    cardInformation.appendChild(cardLikeButton);
    cardLikeButton.appendChild(cardLikeButtonImage);
    cardRectangle.appendChild(cardDeleteButton);
    cardDeleteButton.appendChild(cardDeleteButtonImage);

    cardLikeButton.addEventListener("click", () => {
      if (cardLikeButtonImage.src.includes("Like.png")) {
        //aquí hay encapsulación y modularidad, es decir, ya no se depende de funciones externas ni de IDs o selectores globales.
        cardLikeButtonImage.src = "./images/Union.png";
      } else {
        cardLikeButtonImage.src = "./images/Like.png";
      }
    });
    cardDeleteButton.addEventListener("click", () => {
      card.remove();
    });

    return card;
  }

  generateCard() {
    return this.#getTemplate(); //se crea esta función para llamar al resultado final de #getTemplate().
  }
}
export default Card;
