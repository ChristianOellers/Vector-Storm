/**
 * Global loop.
 */
export default class Loop {
  score: any;
  renderLoop: any;
  useInterval: boolean;
  intervalSpeed: number;
  interval: any;
  stopped: boolean;

  /**
   * Set dependencies and bind events.
   */
  constructor(params: any) {
    // Instance
    this.score = params.score;
    this.renderLoop = params.renderLoop;
    this.useInterval = params.useInterval;

    // Values
    this.intervalSpeed = (1000 / 60) * 2; // Slow motion
    this.interval = null;
    this.stopped = false;

    this.bindEvents();
  }

  /**
   * Run loop as interval or frame based.
   */
  run() {
    if (this.useInterval) {
      const callback = this.loopInterval.bind(this);
      this.interval = setInterval(callback, this.intervalSpeed);
    } else {
      this.loop();
    }
  }

  /**
   * Loop mode: Interval.
   *
   * - Run renderer
   * - Check global game conditions
   */
  loopInterval() {
    if (this.stopped) {
      return;
    }

    this.renderLoop.run();
    this.score.checkConditions();
  }

  /**
   * Loop mode: Frame-based.
   *
   * - Run renderer
   * - Check global game conditions
   */
  loop() {
    if (this.stopped) {
      return;
    }

    this.renderLoop.run();
    this.score.checkConditions();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Stop loop.
   */
  stop() {
    const loopReference: any = this.loop;

    window.cancelAnimationFrame(loopReference);
    clearInterval(this.interval);

    this.stopped = true;
    this.interval = null;
  }

  /**
   * Events.
   */
  bindEvents() {
    window.addEventListener(
      'score:game-end',
      (_event: any) => {
        this.stop();
      },
      true,
    );

    window.addEventListener(
      'controls:keydown',
      (event: any) => {
        const ev = event.detail.data;

        // Manually run
        if (ev.ctrlKey) {
          this.loopInterval();
        }
      },
      true,
    );
  }
}
