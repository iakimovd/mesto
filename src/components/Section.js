export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {   //метод должен в цикле вызывать renderer в котором отрисовывается разметка экземпляров карточек 
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {    //тут добавляем в контейнер отдельную карточку (нужен для случаев добавления нового места)
    this._container.prepend(element);
  }
}