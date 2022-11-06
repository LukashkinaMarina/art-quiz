import { View } from '../View';

export class Answers extends View {
  constructor(props) {
    const { checkAnswer, answer1, answer2, answer3, answer4, imageNum } = props;
    super({ componentName: 'Answers', ...props });
    this.checkAnswer = checkAnswer;
    this.wrong = [answer1, answer2, answer3, answer4].filter(
      (el) => el != imageNum
    );

    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;

    this.link1 = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${answer1}.jpg`;
    this.link2 = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${answer2}.jpg`;
    this.link3 = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${answer3}.jpg`;
    this.link4 = `https://raw.githubusercontent.com/LukashkinaMarina/image-data/master/img/${answer4}.jpg`;
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

  afterRender = () => {
    if (this.service.getSettings().gameForTime) {
      this.gameSpeed = this.service.getSettings().gameSpeed;
      this.intervalID = setInterval(this.updateTimer, 1000);
      document.querySelector('.timer').textContent = this.gameSpeed;
      return;
    }
    document.querySelector('.timer').style.display = 'none';
  };

  beforeTokenReplacement = async () => {
    await this.service.cacheImages([
      this.link1,
      this.link2,
      this.link3,
      this.link4,
    ]);
  };

  addEvents = () => [
    {
      query: '.answer1',
      type: 'click',
      fn: () => this.checkAnswer(this.answer1),
    },
    {
      query: '.answer2',
      type: 'click',
      fn: () => this.checkAnswer(this.answer2),
    },
    {
      query: '.answer3',
      type: 'click',
      fn: () => this.checkAnswer(this.answer3),
    },
    {
      query: '.answer4',
      type: 'click',
      fn: () => this.checkAnswer(this.answer4),
    },
  ];
}
