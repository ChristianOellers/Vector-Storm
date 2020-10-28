/**
 * Input controls.
 */
export default class Controls {
  view: any;
  container: any;

  /**
   * Set view reference and bind events.
   */
  constructor(params: any) {
    // Instance
    this.view = params.view;

    // Values
    this.container = this.view.canvas;

    this.bindEvents();
  }

  /**
   * Bind events:
   */
  bindEvents() {
    const { container } = this;

    container.addEventListener(
      'mousedown',
      (_event: any) => {
        this.onEvent('controls:mousedown');
      },
      true,
    );

    window.addEventListener(
      'keydown',
      (_event: any) => {
        this.onEvent('controls:keydown');
      },
      true,
    );
  }

  /**
   * Event callback.
   */
  onEvent(eventName: string) {
    const { container } = this;

    const ev = new CustomEvent(eventName, {
      detail: {
        data: event,
      },
    });

    container.dispatchEvent(ev);
  }
}
