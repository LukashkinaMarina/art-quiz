import { Repository } from './Repository';
export class GameRepository extends Repository {
  images = [];
  constructor() {
    super();
  }
  saveSettings = (settings) => {
    this.state.settings = settings;
  };

  getSettings = () => {
    return this.state.settings;
  };

  loadImages = (callback) => {
    fetch(`images/images.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.images = data;
        callback && callback();
      })
      .catch((err) => {
        console.warn('Something went wrong.', err);
      });
  };
}
