import { Card } from '../view/Card/Card';
import { ScoreCard } from '../view/ScoreCard/ScoreCard';

export class Game {
  constructor(props) {
    const { screens, service } = props;
    this.screens = screens;
    this.service = service;
  }

  removeAll = () => {
    Object.keys(this.screens).forEach((k) => this.screens[k].remove());
  };

  open = (screen, props) => {
    this.removeAll();
    this.screens[screen].render(props);
    this.service.playSound('open');
  };

  cache = () => {
    this.service.getClassData(new Card({}));
    this.service.getClassData(new ScoreCard({}));
  };

  start = () => {
    this.cache();
    this.service.loadImages(() => {
      this.screens.home.render();
    });
  };
}
