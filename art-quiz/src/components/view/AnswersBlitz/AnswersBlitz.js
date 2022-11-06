import { View } from '../View';

const BLITZ_TIME = 6;
export class AnswersBlitz extends View {
  constructor(props) {
    const { checkAnswer, imageNum, author, answer } = props;
    super({ componentName: 'AnswersBlitz', ...props });
    this.blitzTime = BLITZ_TIME;
    this.checkAnswer = checkAnswer;
    this.author = author;
    this.answer = answer;
    this.imageNum = imageNum;
    this.questionImage = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${imageNum}.jpg`;
    this.time = 0;
  }

  check = (value) => {
    this.time = 0;
    this.stopTimer();
    return value;
  };

  updateTimer = () => {
    if (this.time < this.blitzTime) {
      this.time++;
      document.querySelector('.timer').textContent = this.blitzTime - this.time;
      return;
    }
    this.checkAnswer(this.check(false));
  };

  stopTimer = () => {
    clearInterval(this.intervalID);
  };

  beforeTokenReplacement = async () => {
    await this.service.cacheImage(this.questionImage);
  };

  afterRender = () => {
    if (this.service.getSettings().gameForTime) {
      this.intervalID = setInterval(this.updateTimer, 1000);
      document.querySelector('.timer').textContent = this.blitzTime;
      return;
    }
    document.querySelector('.timer').style.display = 'none';
  };

  addEvents = () => [
    {
      query: '.answer-blitz-yes',
      type: 'click',
      fn: () => this.checkAnswer(this.check(this.author === this.answer)),
    },
    {
      query: '.answer-blitz-no',
      type: 'click',
      fn: () => this.checkAnswer(this.check(this.author !== this.answer)),
    },
  ];
}
