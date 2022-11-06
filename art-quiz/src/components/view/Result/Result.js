import { View } from '../View';

export class Result extends View {
  constructor(props) {
    super({ componentName: 'Result', ...props });
    const { result, next, card } = props;
    const { imageNum, year, name, author } = card;
    this.imageNum = imageNum;
    this.year = year;
    this.name = name;
    this.author = author;
    this.result = result;
    this.resultSym = result ? '✓' : '✗';
    this.next = next;
  }
  addEvents = () => [
    {
      query: '.next-questions',
      type: 'click',
      fn: () => this.next(),
    },
  ];
  changeBulletResult = (color) => {
    document.getElementsByClassName(
      'result-bullet'
    )[0].style.backgroundColor = color;
  };

  afterRender = () => {
    if (this.result === true) {
      this.changeBulletResult('green');
      this.service.playSound('win');
    }
    if (this.result === false) {
      this.changeBulletResult('red');
      this.service.playSound('loss');
    }
  };
}
