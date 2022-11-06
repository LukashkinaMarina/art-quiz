import { ScoreCard } from '../ScoreCard/ScoreCard';
import { View } from '../View';

export class CategoriesScore extends View {
  constructor(props) {
    super({ componentName: 'CategoriesScore', ...props });
  }

  afterRender = () => {
    this.arr = [];
    const cards = this.service.getCategoryQuestions(
      this._categoryIndex,
      this.gameType
    );
    const name = this.service.getState().categories[this._categoryIndex];
    cards.forEach((card, index) => {
      this.arr.push(
        new ScoreCard({
          id: index,
          categoryIndex: this._categoryIndex,
          card,
          name,
          className: `score-card-${index}`,
          parentClassName: 'score-list',
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
      query: '.return-home-score',
      type: 'click',
      fn: () => this.controller.openHome(),
    },
    {
      query: '.return-categories-score',
      type: 'click',
      fn: () => this.controller.openCategories(this.gameType),
    },
  ];
}
