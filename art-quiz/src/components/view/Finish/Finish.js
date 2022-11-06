import { View } from '../View';

export class Finish extends View {
  constructor(props) {
    super({ componentName: 'Finish', ...props });
    this.message = 'Попробуйте другую категорию!';
    this.image = 'images/good-job.jpg';
  }

  beforeTokenReplacement = async () => {
    if (this.count < 3) {
      this.image = 'images/try-again.jpg';
      await this.service.cacheImage(this.image);
      this.message = 'Попробуйте еще раз!';
      this.service.playSound('poor');
    }
    if (this.count > 3 && this.count < 6) {
      this.image = 'images/not-bad.jpg';
      await this.service.cacheImage(this.image);
      this.message = 'Неплохо!';
      this.service.playSound('game-over');
    }
    if (this.count > 5) {
      this.image = 'images/good-job.jpg';
      await this.service.cacheImage(this.image);
      this.message = 'Отличная работа!';
      this.service.playSound('game-over');
    }
  };
  addEvents = () => [
    {
      query: '.return-home-finish',
      type: 'click',
      fn: () => this.controller.openHome(),
    },
    {
      query: '.return-home-categories',
      type: 'click',
      fn: () => this.controller.openCategories(this.gameType),
    },
  ];
}
