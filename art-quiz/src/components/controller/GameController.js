export class GameController {
  constructor(service) {
    this.service = service;
  }

  /**
   * @param {import("../model/Game").Game} _game
   */
  set game(_game) {
    this._game = _game;
  }

  get game() {
    return this._game;
  }

  openHome = () => {
    this.game.open('home');
  };

  openSettings = () => {
    this.game.open('settings');
  };

  openCategories = (gameType) => {
    this.game.open('categories', { gameType });
  };

  openCategoriesScore = (_categoryIndex, gameType) => {
    this.game.open('categoriesScore', {
      _categoryIndex,
      gameType,
    });
  };

  openQuestions = (_categoryIndex, gameType) => {
    this.game.open('questions', {
      _categoryIndex,
      gameType,
      _index: 0,
      passed: Array(10).fill(0),
    });
  };

  saveSettings = (settings) => {
    this.service.saveSettings(settings);
  };

  openFinish = (count, gameType) => {
    this.game.open('finish', { count, gameType });
  };
}
