import { GameType } from '../model/GameType';

export class Repository {
  styles = {};
  defaultState = {
    categories: [
      'Портреты',
      'Пейзажи',
      'Люди',
      'Графика',
      'Античность',
      'Авангард',
      'Ренессанс',
      'Сюрреалзим',
      'Китч',
      'Минимализм',
      'Классицизм',
      'Соцреализм',
    ],
    answers: [],
    settings: {
      gameSpeed: 30,
      gameForTime: true,
      volume: '60',
    },
    categoriesProgress: {
      [GameType.ARTISTS]: [],
      [GameType.BLITZ]: [],
      [GameType.PICTURES]: [],
    },
  };

  _sounds = {};
  imagesCache = {};
  images;
  classData = [];

  constructor() {
    this._state = this.getItem('state') || this.defaultState;
  }

  get state() {
    return this._state;
  }

  /**
   * @param {State} _state
   */
  set setState(_state) {
    this._state = _state;
  }

  get sounds() {
    return this._sounds;
  }

  setClassData = (className, data) => {
    this.classData[className] = data;
  };

  init = async (name) => {
    if (!this.state.globalStyles) {
      const globalStyles = await new Promise((resolve, reject) =>
        fetch(`style.css`)
          .then((response) => {
            return response.text();
          })
          .then((css) => {
            resolve(css);
          })
          .catch((err) => {
            reject(err);
            console.warn('Something went wrong.', err);
          })
      );
      this.state.globalStyles = globalStyles;
    }
    const cssData = await new Promise((resolve, reject) =>
      fetch(`components/view/${name}/${name}.css`)
        .then((response) => {
          return response.text();
        })
        .then((css) => {
          resolve(css);
        })
        .catch((err) => {
          reject(err);
          console.warn('Something went wrong.', err);
        })
    );
    const htmlData = await new Promise((resolve, reject) =>
      fetch(`components/view/${name}/${name}.html`)
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          resolve(html);
        })
        .catch((err) => {
          reject(err);
          console.warn('Something went wrong.', err);
        })
    );
    const data = {
      css: cssData,
      html: htmlData,
      initialized: true,
    };
    this.setClassData(name, data);
  };

  getClassData = async (obj) => {
    if (!this.classData[obj.componentName]) {
      await this.init(obj.componentName, obj.className);
    }
    return this.classData[obj.componentName];
  };

  setAnswers = (categoryIndex, answers) => {
    this.state.answers[categoryIndex] = answers;
  };

  setItem = (selector, item) => {
    localStorage.setItem(selector, JSON.stringify(item));
  };
  getItem = (selector) => {
    return JSON.parse(localStorage.getItem(selector));
  };
}
