import { Card } from '../Card/Card';
import { View } from '../View';
export class Categories extends View {
  constructor(props) {
    super({ componentName: 'Categories', ...props });
  }
  afterRender = () => {
    this.arr = [];
    const categories = this.service.getState().categories;
    categories.forEach((name, index) => {
      this.arr.push(
        new Card({
          id: index,
          name,
          gameType: this.gameType,
          className: `category-card-${index}`,
          parentClassName: 'categories-list',
          controller: this.controller,
          service: this.service,
        })
      );
      this.arr[index].render();
    });
  };

  afterRemove = () => {
    this.removeAll(this.arr);
  };

  addEvents = () => [
    {
      query: '.return-from-categories',
      type: 'click',
      fn: () => this.controller.openHome(),
    },
    {
      query: '.settings-from-categories',
      type: 'click',
      fn: () => this.controller.openSettings(),
    },
  ];
}
