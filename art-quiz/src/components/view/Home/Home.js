import { GameType } from '../../model/GameType';
import { View } from '../View';
export class Home extends View {
  constructor(props) {
    super({ componentName: 'Home', ...props });
  }

  beforeRender = () => {
    this.service.cacheImages([
      'images/artists.jpg',
      'images/pictures.jpg',
      'images/blitz.jpg',
    ]);
  };

  addEvents = () => {
    return [
      {
        query: '.settings-button',
        type: 'click',
        fn: () => this.controller.openSettings(),
      },
      {
        query: '.artists-quiz-image',
        type: 'click',
        fn: () => this.controller.openCategories(GameType.ARTISTS),
      },
      {
        query: '.blitz-quiz-image',
        type: 'click',
        fn: () => this.controller.openCategories(GameType.BLITZ),
      },
      {
        query: '.pictures-quiz-image',
        type: 'click',
        fn: () => this.controller.openCategories(GameType.PICTURES),
      },
    ];
  };
}
