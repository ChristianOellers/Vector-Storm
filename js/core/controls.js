// @flow
class Controls {
  private container;

  constructor(params) {
    // Instance
    this.view = params.view;

    // Values
    this.container = this.view.canvas;

    this.bindEvents();
  }

  bindEvents() {
    const { container } = this;

    container.addEventListener(
      'mousedown',
      (event) => {
        this.onEvent("controls:mousedown");
      },
      true
    );

    window.addEventListener(
      "keydown",
      (event) => {
        this.onEvent("controls:keydown");
      },
      true
    );
  }

  onEvent(eventName) {
    const { container } = this;

    const ev = new CustomEvent(eventName, {
      detail: {
        data: event,
      },
    });

    container.dispatchEvent(ev);
  }
}
