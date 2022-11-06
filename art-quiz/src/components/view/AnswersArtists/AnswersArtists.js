import { View } from '../View';

export class AnswersArtists extends View {
  constructor(props) {
    const { checkAnswer, imageNum, answer1, answer2, answer3, answer4 } = props;
    super({ componentName: 'AnswersArtists', ...props });
    this.checkAnswer = checkAnswer;
    this.imageNum = imageNum;
    this.wrong = [answer1, answer2, answer3, answer4].filter(
      (el) => el != imageNum
    );
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.questionImage = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${imageNum}.jpg`;
    this.time = 0;
  }

  check = (value) => {
    this.time = 0;
    this.stopTimer();
    return value;
  };

  updateTimer = () => {
    if (this.time < this.gameSpeed) {
      this.time++;
      document.querySelector('.timer').textContent = this.gameSpeed - this.time;
      return;
    }
    this.checkAnswer(this.check(this.wrong[0]));
  };

  stopTimer = () => {
    clearInterval(this.intervalID);
  };

  beforeTokenReplacement = async () => {
    await this.service.cacheImage(this.questionImage);
  };

  afterRender = () => {
    if (this.service.getSettings().gameForTime) {
      this.gameSpeed = this.service.getSettings().gameSpeed;
      this.intervalID = setInterval(this.updateTimer, 1000);
      document.querySelector('.timer').textContent = this.gameSpeed;
      return;
    }
    document.querySelector('.timer').style.display = 'none';
  };

  addEvents = () => [
    {
      query: '.answer-artist1',
      type: 'click',
      fn: () => this.checkAnswer(this.check(this.answer1)),
    },
    {
      query: '.answer-artist2',
      type: 'click',
      fn: () => this.checkAnswer(this.check(this.answer2)),
    },
    {
      query: '.answer-artist3',
      type: 'click',
      fn: () => this.checkAnswer(this.check(this.answer3)),
    },
    {
      query: '.answer-artist4',
      type: 'click',
      fn: () => this.checkAnswer(this.check(this.answer3)),
    },
  ];
}
