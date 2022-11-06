export class View {
  constructor(props) {
    const {
      className,
      parentClassName,
      controller,
      service,
      componentName,
    } = props;
    this.componentName = componentName;
    this.componentClassName = `${componentName}-component`;
    this.controller = controller;
    this.service = service;
    this.className = className;
    this.element = document.createElement('div');
    this.element.className = this.className;
    this.parentClassName = parentClassName;
  }

  beforeRender = () => undefined;
  afterRender = () => undefined;
  beforeRemove = () => undefined;
  afterRemove = () => undefined;
  beforeTokenReplacement = () => undefined;
  addEvents = () => undefined;

  getClassData = async () => {
    return this.service.getClassData(this) || {};
  };

  addChildEvents = () => {
    const events = this.addEvents();
    if (!events) return;
    events.forEach((event) => {
      const { query, type, fn } = event;
      document.querySelector(query).addEventListener(type, fn);
    });
  };

  update = (html) => {
    let newHtml = html;
    Array.from(Object.keys(this)).forEach((key) => {
      newHtml = newHtml.split(`{{${key}}}`).join(this[key]);
    });
    return newHtml;
  };

  setProps = (props) => {
    if (!props) return;
    Object.keys(props).forEach((key) => {
      this[key] = props[key];
    });
  };

  getElement = (query) => document.querySelector(query);

  updateComponentStyles = () => {
    document.querySelector('style').innerHTML =
      this.service.getState().globalStyles +
      '\n\r' +
      Object.values(this.service.getStyles()).join('\n\r');
  };

  getStyles = () => {
    return this.service.getStyles()[this.componentClassName];
  };

  appendStyles = async () => {
    const data = await this.getClassData();
    const styles = data.css.split('.T ').join(`.${this.componentClassName} `);
    if (!this.getStyles()) {
      this.service.getStyles()[this.componentClassName] = {
        css: '',
        classes: [],
      };
    }
    this.getStyles().css = styles;
    this.getStyles().classes.push(this.className);
    document.querySelector('style').innerHTML = Object.values(
      this.service.getStyles()
    )
      .map((v) => v.css)
      .join('\n\r');
  };

  appendHtmlToElement = async () => {
    const data = await this.getClassData();
    this.element.innerHTML = this.update(data.html);
    document
      .getElementsByClassName(this.parentClassName)[0]
      .appendChild(this.element);
  };

  render = async (props) => {
    this.element.classList.add(this.componentClassName);
    this.setProps(props);
    this.beforeRender();
    await this.beforeTokenReplacement();
    await this.appendStyles();
    await this.appendHtmlToElement();
    this.addChildEvents();
    this.afterRender();
  };

  removeAll = (arr) => {
    if (!arr) return;
    arr.forEach((el) => el.remove());
  };

  remove = () => {
    this.beforeRemove();
    this.element.remove();
    if (this.getStyles()) {
      this.getStyles().classes = this.getStyles().classes.filter(
        (c) => this.className !== c
      );
      if (this.getStyles().classes.length === 0) {
        this.service.getStyles()[this.componentClassName] = {
          css: '',
          classes: [],
        };
      }
    }
    this.updateComponentStyles();
    this.afterRemove();
    this.service.removeIntervals();
  };

  rerender = () => {
    this.remove();
    this.render();
  };
}
