import { GameType } from '../model/GameType';
export class GameService {
  constructor(repository) {
    this.repository = repository;
  }

  saveSettings = (settings) => {
    this.repository.saveSettings(settings);
  };

  getSettings = () => {
    return this.repository.getSettings();
  };

  defaultSettings = () => {
    this.repository.state.settings = this.repository.defaultState.settings;
    return this.repository.defaultState.settings;
  };

  getStyles = () => {
    return this.repository.styles;
  };

  getState = () => {
    return this.repository.state;
  };

  setAnswers = (categoryIndex, answers) => {
    return this.repository.setAnswers(categoryIndex, answers);
  };

  getClassData = async (obj) => {
    return this.repository.getClassData(obj);
  };

  loadImages = (callback) => {
    return this.repository.loadImages(callback);
  };

  getRandomIndex = (from, to) => {
    return Math.floor(Math.random() * to - from + from);
  };

  getCategoryArtistQuestions = (categoryIndex) => {
    const from = categoryIndex + 1 * 10 + 100;
    const images = this.repository.images.filter(
      (a, index) => index >= from && index < from + 10
    );
    const authorArray = this.repository.images.map((a) => a.author);
    const questions = [];
    images.forEach((it) => {
      const filtered = authorArray.filter((a) => a !== it.author);
      const answers = [];
      const part = Math.trunc(filtered.length / 3);
      let from = 0;
      let to = part;
      for (let i = 0; i < 3; i++) {
        answers.push(filtered[this.getRandomIndex(from, to)]);
        from += part;
        to += part;
      }
      const shuffled = [it.author, ...answers];
      shuffled.sort((a, b) => (Math.random() < 0.5 ? 1 : -1));
      questions.push({
        ...it,
        answers: shuffled,
      });
    });
    return questions;
  };

  getCategoryPictureQuestions = (categoryIndex) => {
    const from = categoryIndex + 1 * 10;
    const images = this.repository.images.filter(
      (a, index) => index >= from && index < from + 10
    );
    const urlArray = this.repository.images.map((a) => a.imageNum);
    const questions = [];
    images.forEach((it) => {
      const filtered = urlArray.filter((a) => a !== it.imageNum);
      const answers = [];
      const part = Math.trunc(filtered.length / 3);
      let from = 0;
      let to = part;
      for (let i = 0; i < 3; i++) {
        answers.push(filtered[this.getRandomIndex(from, to)]);
        from += part;
        to += part;
      }
      const shuffled = [it.imageNum, ...answers];
      shuffled.sort((a, b) => (Math.random() < 0.5 ? 1 : -1));
      questions.push({
        ...it,
        answers: shuffled,
      });
    });
    return questions;
  };

  getCategoryBlitzQuestions = (categoryIndex) => {
    const from = categoryIndex + 1 * 10 + 121;
    const images = this.repository.images.filter(
      (a, index) => index >= from && index < from + 10
    );
    const length = this.repository.images.length;
    const questions = [];
    images.forEach((it) => {
      const filtered = this.repository.images.filter((a) => a !== it.author);
      const wrongAuthor = filtered[this.getRandomIndex(0, length - 1)].author;
      const answer = Math.random() > 0.5;
      questions.push({
        ...it,
        author: answer ? it.author : wrongAuthor,
        answer: it.author,
      });
    });
    return questions;
  };

  getCategoryQuestions = (categoryIndex, gameType) => {
    switch (gameType) {
      case GameType.ARTISTS:
        return this.getCategoryArtistQuestions(categoryIndex);
      case GameType.PICTURES:
        return this.getCategoryPictureQuestions(categoryIndex);
      case GameType.BLITZ:
        return this.getCategoryBlitzQuestions(categoryIndex);
    }
  };

  removeIntervals = () => {
    var killId = setTimeout(function() {
      for (var i = killId; i > 0; i--) clearInterval(i);
    }, 10);
  };

  changeVolume = (event) => {
    const settings = this.getSettings();
    settings.volume = event.target.value;
    this.saveSettings(settings);
    this.playSound('notify');
  };

  changeGameMode = (event) => {
    const settings = this.getSettings();
    settings.gameForTime = event.target.checked;
    this.saveSettings(settings);
    this.playSound('notify');
  };

  changeTimeToAnswer = (event) => {
    const settings = this.getSettings();
    settings.gameSpeed = event.target.value;
    this.saveSettings(settings);
    this.playSound('notify');
  };
  playSound = (sound) => {
    if (!this.repository.sounds[sound]) {
      this.repository.sounds[sound] = new Audio(`sounds/${sound}.wav`);
    }
    this.repository.sounds[sound].volume =
      (this.repository.getSettings().volume || 0.01) / 100;
    this.repository.sounds[sound].play();
  };

  cacheImages = async (urls) => {
    await Promise.all(urls.map((u) => () => this.cacheImage(u)));
  };

  cacheImage = async (url) => {
    if (!this.repository.imagesCache[url]) {
      const img = await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
      if (img) {
        this.repository.imagesCache[url] = img;
      }
    }
  };
}
