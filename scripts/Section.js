export default class Section {
  //esta clase es para presentar una lista de elementos en una pagina web
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    //se limpia el contenedor del HTML interno
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear(); //antes de renderizar, se limpia el contenedor
    this._items.forEach((item) => {
      //para cada item del array items
      const element = this._renderer(item); //se llama a la función de callback en cada item, para renderizar a c/u
      this.addItem(element);
    });
  }
}
