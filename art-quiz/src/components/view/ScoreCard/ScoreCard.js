import { View } from '../View';

export class ScoreCard extends View {
  constructor(props) {
    const { card, name, id, categoryIndex } = props;
    super({ componentName: 'ScoreCard', ...props });
    this.id = id;
    this.categoryIndex = categoryIndex;
    this.card = card;
    this.name = name;
    if (card) {
      this.year = card.year;
      this.pictureName = card.name;
      this.author = card.author;
      this.result = card.result;
    }
  }

  beforeTokenReplacement = async () => {
    this.scoreCardImage = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${this.imageNum}.jpg`;
    this.scoreCardImageFull = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/full/${this.imageNum}full.jpg`;
    await this.service.cacheImage(this.scoreCardImage);
  };

  beforeRender = () => {
    this.imageNum = this.service.getState().answers[this.categoryIndex][
      this.id
    ].imageNum;
    this.passed = this.service.getState().answers[this.categoryIndex][
      this.id
    ].passed;
  };

  afterRemove = () => {
    this.removeAll(this.arr);
  };

  afterRender = () => {
    if (this.passed) {
      document.getElementsByClassName(
        `score-card-link-${this.className}`
      )[0].style.filter = 'unset';
      return;
    }
    document.getElementsByClassName(
      `score-card-info-container-${this.className}`
    )[0].style.display = 'none';
  };
}
