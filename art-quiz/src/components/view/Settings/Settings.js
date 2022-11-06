import { View } from '../View';

export class Settings extends View {
  constructor(props) {
    super({ componentName: 'Settings', ...props });
  }

  beforeTokenReplacement = () => {
    const settings = this.service.getSettings();
    this.gameSpeed = settings.gameSpeed;
    this.gameForTime = settings.gameForTime;
    this.volume = settings.volume;
    this.checked = settings.gameForTime ? 'checked' : '';
  };

  addEvents = () => [
    {
      query: '.close-settings-button',
      type: 'click',
      fn: () => this.controller.openHome(),
    },
    {
      query: '.default-settings',
      type: 'click',
      fn: () => {
        this.service.defaultSettings();
        this.rerender();
        this.beforeTokenReplacement();
      },
    },
    {
      query: '.sound-volume',
      type: 'change',
      fn: (event) => this.service.changeVolume(event),
    },
    {
      query: '.game-mode',
      type: 'click',
      fn: (event) => this.service.changeGameMode(event),
    },
    {
      query: '.time-to-answer',
      type: 'change',
      fn: (event) => this.service.changeTimeToAnswer(event),
    },
  ];
}
