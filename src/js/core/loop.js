class Loop {
  constructor(params) {
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

  run() {
    if (this.useInterval) {
      const callback = this.loopInterval.bind(this);
      this.interval = setInterval(callback, this.intervalSpeed);
    } else {
      this.loop();
    }
  }

  loopInterval() {
    if (this.stopped) {
      return;
    }

    this.renderLoop.run();
    this.score.checkConditions();
  }

  loop() {
    if (this.stopped) {
      return;
    }

    this.renderLoop.run();
    this.score.checkConditions();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.loop);
    clearInterval(this.interval);

    this.stopped = true;
    this.interval = null;
  }

  bindEvents() {
    window.addEventListener(
      'score:game-end',
      (event) => {
        const objects = event.detail.data;

        this.stop();
      },
      true,
    );

    window.addEventListener(
      'controls:keydown',
      (event) => {
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
