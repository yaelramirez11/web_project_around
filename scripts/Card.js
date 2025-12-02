class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    userId,
    api
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick; //Abrirá el popup de confirmación
    this._isLiked = data.isLiked || false;
    this._id = data._id;
    this._ownerId = data.owner; //dueño de la tarjeta
    this._userId = userId; //y el usuario actual (comparar estos dos valores, y si son iguales = mostrar ícono de "eliminar tarjeta")
    this._api = api; //para el like de tarjetas
  }

  #getTemplate() {
    //aquí, en la función privada getTemplate, se pasó el código completo de la creación de las tarjetas
    const card = document.createElement("div");
    card.classList.add("element");

    const cardRectangle = document.createElement("div");
    cardRectangle.classList.add("element__rectangle");

    const cardImage = document.createElement("img");
    cardImage.alt = this._name;
    cardImage.src = this._link; //ahora se toman de las propiedades de la instancia de Card, en el constructor.
    cardImage.classList.add("element__image");

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link); //igual aquí. En todo usamos this._, propiedades declaradas en el constructor
    });

    const cardInformation = document.createElement("div");
    cardInformation.classList.add("element__info");

    const cardText = document.createElement("p");
    cardText.textContent = this._name; //uso de this._ también aquí.
    cardText.classList.add("element__text");

    const cardLikeButton = document.createElement("button");
    cardLikeButton.classList.add("element__button");

    const cardLikeButtonImage = document.createElement("img");
    cardLikeButtonImage.src = "./images/Like.png";
    cardLikeButtonImage.alt = "botón de me gusta";
    cardLikeButtonImage.classList.add("element__button-image");
    this._cardLikeButtonImage = cardLikeButtonImage;
    this._updateLikeState(); //Esta llamada solo sincroniza la UI con el estado inicial de la tarjeta al renderizarla. Es decir, si el usuario ya había dado like antes (al cargar la página), la imagen se mostrará correcta desde el principio.

    const cardDeleteButton = document.createElement("button");
    cardDeleteButton.classList.add("element__delete-button");
    this._cardDeleteButton = cardDeleteButton;

    if (String(this._ownerId) !== String(this._userId)) {
      this._cardDeleteButton.style.display = "none";
    }

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
      const apiCall = this._isLiked
        ? this._api.deleteLikeFromCard(this._id) //Se usa un operador ternario entre los dos métodos de api.js
        : this._api.addLikeToCard(this._id);

      apiCall
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked;
          this._updateLikeState(); //Y esta llamada de aquí, a diferencia de la anterior, actualiza el estado del botón inmediatamente.
        })
        .catch((error) => console.log("Error al actualizar like:", error));
    });

    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._element = card;
    return card;
  }

  _updateLikeState() {
    this._cardLikeButtonImage.src = this._isLiked
      ? "./images/Union.png"
      : "./images/Like.png";
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    return this.#getTemplate(); //se crea esta función para llamar al resultado final de #getTemplate().
  }
}
export default Card;
