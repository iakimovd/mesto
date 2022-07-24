export class Section {
  constructor( renderer, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {   //метод должен в цикле вызывать renderer в котором отрисовывается разметка экземпляров карточек 
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {    //тут добавляем в контейнер отдельную карточку (нужен для случаев добавления нового места)
    this._container.prepend(element);
  }
}