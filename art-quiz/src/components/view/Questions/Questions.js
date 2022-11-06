import { GameType } from '../../model/GameType';
import { Result } from '../Result';
import { View } from '../View';
import { Answers } from '../Answers';
import { AnswersArtists } from '../AnswersArtists';
import { AnswersBlitz } from '../AnswersBlitz/AnswersBlitz';

export class Questions extends View {
  rounds = 10;
  constructor(props) {
    const { categoryIndex } = props;
    super({ componentName: 'Questions', ...props });
    this._categoryIndex = categoryIndex;
    this._index = 0;
    this.passed = Array(10).fill(0);
  }
  /**
   * @param {number} categoryIndex
   */
  set categoryIndex(categoryIndex) {
    this._categoryIndex = categoryIndex;
  }

  mapping = (author) => {
    return {
      [GameType.ARTISTS]: 'Кто автор данной картины?',
      [GameType.BLITZ]: `Эту картину написал ${author}?`,
      [GameType.PICTURES]: `Какую картину написал ${author}?`,
    };
  };

  toCheck = () =>
    this.gameType === GameType.PICTURES || this.gameType === GameType.BLITZ
      ? 'imageNum'
      : 'author';

  calculatePassedQuestion = () =>
    this.passed.filter((q, i) => q === this._questions[i][this.toCheck()])
      .length;

  createPicturesAnswers = () => {
    const question = this._questions[this._index];
    this.answers = new Answers({
      className: 'answers-result',
      parentClassName: 'answers-buttons',
      answer1: question.answers[0],
      answer2: question.answers[1],
      answer3: question.answers[2],
      answer4: question.answers[3],
      imageNum: question.imageNum,
      checkAnswer: this.checkAnswer,
      controller: this.controller,
      service: this.service,
    });
  };

  createArtistsAnswers = () => {
    const question = this._questions[this._index];
    this.answers = new AnswersArtists({
      className: 'answers-artists-result',
      parentClassName: 'answers-buttons',
      answer1: question.answers[0],
      answer2: question.answers[1],
      answer3: question.answers[2],
      answer4: question.answers[3],
      imageNum: question.imageNum,
      checkAnswer: this.checkAnswer,
      controller: this.controller,
      service: this.service,
    });
  };

  createBlitzAnswers = () => {
    const { imageNum, author, answer } = this._questions[this._index];
    this.answers = new AnswersBlitz({
      className: 'answers-blitz-result',
      parentClassName: 'answers-buttons',
      imageNum,
      author,
      answer,
      checkAnswer: this.checkBlitzAnswer,
      controller: this.controller,
      service: this.service,
    });
  };

  updateAnswers = () => {
    if (this.answers) this.answers.remove();
    if (this.gameType === GameType.PICTURES) this.createPicturesAnswers();
    if (this.gameType === GameType.ARTISTS) this.createArtistsAnswers();
    if (this.gameType === GameType.BLITZ) this.createBlitzAnswers();
    this.answers.render();
  };

  next = (withoutResult) => {
    this._index++;
    if (!withoutResult) {
      this.result.remove();
      this.result = undefined;
    }
    if (this._index !== this.rounds) {
      this.rerender();
      return;
    }
    this._index = 0;
    const answers = this.passed.map((n, i) => {
      return {
        passed: n === this._questions[i][this.toCheck()],
        imageNum:
          this.toCheck() === 'imageNum'
            ? n.replace('{{wrong}}', '')
            : this._questions[i].imageNum,
      };
    });
    this.service.setAnswers(this._categoryIndex, answers);
    this.controller.openFinish(this.calculatePassedQuestion(), this.gameType);
    this.passed = Array(10).fill(0);
  };

  checkAnswer = (num) => {
    if (!this.result) {
      const checked = num === this._questions[this._index][this.toCheck()];
      this.result = new Result({
        className: 'answer-result',
        parentClassName: 'answer-popup',
        result: checked,
        card: this._questions[this._index],
        next: this.next,
        controller: this.controller,
        service: this.service,
      });
      this.passed[this._index] = num;
      this.service.getState().categoriesProgress[this.gameType][
        this._categoryIndex
      ] = this.calculatePassedQuestion();
      this.result.render();
    }
  };

  checkBlitzAnswer = (checked) => {
    if (!this.result) {
      const imageNum = this._questions[this._index].imageNum;
      this.passed[this._index] = checked ? imageNum : `{{wrong}}${imageNum}`;
      this.service.getState().categoriesProgress[this.gameType][
        this._categoryIndex
      ] = this.calculatePassedQuestion();
      this.next(true);
    }
  };

  beforeTokenReplacement = () => {
    this._questions = this.service.getCategoryQuestions(
      this._categoryIndex,
      this.gameType
    );
    const questions = this._questions[this._index];
    this.author = questions.author;
    this.imageNum = questions.imageNum;
    this.question = this.mapping(this.author)[this.gameType];
  };

  changeBulletColor = (index, color) => {
    document.getElementsByClassName(
      `answer-bullet${index}`
    )[0].style.backgroundColor = color;
  };

  afterRender = () => {
    this.updateAnswers();
    this.passed.forEach((el, index) => {
      if (!el) return;
      if (el === this._questions[index][this.toCheck()]) {
        this.changeBulletColor(index, 'green');
      }
      if (el !== this._questions[index][this.toCheck()]) {
        this.changeBulletColor(index, 'red');
      }
    });
  };

  addEvents = () => [
    {
      query: '.return-home-questions',
      type: 'click',
      fn: () => this.controller.openHome(),
    },
    {
      query: '.return-categories-questions',
      type: 'click',
      fn: () => this.controller.openCategories(this.gameType),
    },
  ];
}
