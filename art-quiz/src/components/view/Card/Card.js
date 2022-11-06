import { GameType } from '../../model/GameType';
import { View } from '../View';

export class Card extends View {
  categoriesWeight = {
    [GameType.PICTURES]: 0,
    [GameType.ARTISTS]: 100,
    [GameType.BLITZ]: 121,
  };

  constructor(props) {
    const { name, id, gameType } = props;
    super({ componentName: 'Card', ...props });
    this.id = id;
    this.gameType = gameType;
    if (gameType) {
      this.imageNum = this.id * 10 + this.categoriesWeight[gameType];
    }
    this.name = name;
    this.cardImage = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${this.imageNum}.jpg`;
  }

  beforeTokenReplacement = async () => {
    this.progress =
      this.service.getState().categoriesProgress[this.gameType][this.id] || 0;
    await this.service.cacheImage(this.cardImage);
  };

  afterRender = () => {
    if (this.progress) {
      document.getElementsByClassName(
        `category-link-${this.className}`
      )[0].style.filter = 'unset';
      return;
    }
    document.getElementsByClassName(
      `card-button-container-${this.className}`
    )[0].style.display = 'none';
    document.getElementsByClassName(
      `question-progress-${this.className}`
    )[0].style.display = 'none';
  };

  addEvents = () => [
    {
      query: `.questions-button-${this.className}`,
      type: 'click',
      fn: () => this.controller.openQuestions(this.id, this.gameType),
    },
    {
      query: `.score-card-${this.className}`,
      type: 'click',
      fn: () => this.controller.openCategoriesScore(this.id, this.gameType),
    },
  ];
}
