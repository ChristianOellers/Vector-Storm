/**
 *
 */
export default class RenderLoop {
  /**
   *
   */
  constructor(params) {
    // Instance
    this.collision = params.collision;
    this.collisionBounce = params.collisionBounce;
    this.collisionProjectile = params.collisionProjectile;
    this.stage = params.stage;
    this.view = params.view;

    // Values
    this.collisionTypes = ['Ship', 'ShipPlayer'];
    this.isAnimating = false;
    this.clear = false; // If not, draw over
    this.smear = 0.5; // Blur FX; lower values = More blur
    this.animateTime = 2000; // ^= Ship : PLayer

    this.bindEvents();
  }

  /**
   *
   */
  run() {
    const { objects } = this.stage;

    this.reset();

    for (let i = 0; i < objects.length; i++) {
      objects[i].move();
      objects[i].draw();
    }

    this.testObjects();
  }

  /**
   * Todo: Outsource collision detection (inject, pass objects, let them filter)
   */
  testObjects() {
    const { objects } = this.stage;

    const testCollisionShip = [];
    const testCollisionShipBounce = [];
    const testCollisionProjectile = [];

    // Filter to test collideable objects only
    for (let i = 0; i < objects.length; i++) {
      const type = objects[i].__proto__.constructor.name;
      const isMatch = this.collisionTypes.indexOf(type) >= 0;

      if (isMatch) {
        testCollisionShip.push(objects[i]);
        testCollisionShipBounce.push(objects[i]);
      } else {
        testCollisionProjectile.push(objects[i]);
      }
    }

    this.collision.testObjects(testCollisionShip);
    this.collisionBounce.testObjects(testCollisionShipBounce);
    this.collisionProjectile.testObjects(testCollisionProjectile);
  }

  /**
   *
   */
  reset() {
    const { view } = this;
    const { ctx } = view;

    if (this.clear) {
      ctx.clearRect(0, 0, view.width, view.height);
    } else {
      ctx.save();
      ctx.fillStyle = `rgba(0, 0, 0, ${this.smear})`;
      ctx.fillRect(0, 0, view.width, view.height);
      ctx.restore();
    }
  }

  /**
   *
   */
  setFx() {
    if (this.isAnimating) {
      return;
    }

    const smearOld = this.smear;

    this.smear = 0.1;
    this.isAnimating = true;

    window.setTimeout(() => {
      this.smear = smearOld;
      this.isAnimating = false;
    }, this.animateTime);
  }

  /**
   *
   */
  bindEvents() {
    window.addEventListener(
      'controls:keydown',
      (event) => {
        const ev = event.detail.data;

        // Manually run
        if (ev.shiftKey) {
          this.setFx();
        }
      },
      true,
    );
  }
}
