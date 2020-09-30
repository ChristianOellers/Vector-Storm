// @flow
class Projectiles {
  constructor(params) {
    // Instance
    this.stage = params.stage;
    this.view = params.view; // Class: View
    this.projectile1 = params.projectile1; // Class: *
    this.projectile2 = params.projectile2; // Class: *
    this.multiShot = params.multiShot; // Number

    // Values
    this.container = this.view.canvas;

    this.bindEvents();
  }

  createProjectile1(o1, o2) {
    const vector = new Vector2D(o2.x, o2.y);
    const rnd = -(Math.random() * 50) + 25;

    vector.vx = o2.x - (o1.x + rnd);
    vector.vy = o2.y - (o1.y + rnd);

    vector.normalize();

    // Slightly inaccurate
    vector.rotate(Math.random() * 0.05);

    const p = new this.projectile1({
      view: this.view,
      owner: o1,
      vector,
      x: o1.x,
      y: o1.y,
      angle: o1.angle,
      color: 'rgba(64, 224, 255, 1)',
      size: 2,
    });

    this.stage.add(p);
  }

  createProjectile2(o1, o2) {
    const v1 = new Vector2D(o1.x, o1.y);
    const v2 = new Vector2D(o2.x, o2.y);

    // Slightly inaccurate
    v2.rotate(Math.random() * 0.05);

    const p = new this.projectile2({
      view: this.view,
      owner: o1,
      vector1: v1,
      vector2: v2,
      color: 'rgba(0, 192, 255, 1)',
    });

    this.stage.add(p);
  }

  createProjectileEnemy(o1, o2) {
    const vector = new Vector2D(o1.x, o1.y);

    vector.vx = o1.x - o2.x;
    vector.vy = o1.y - o2.y;

    vector.normalize();

    // Slightly inaccurate
    // vector.rotate(Math.random() * 0.1);

    const p = new this.projectile1({
      view: this.view,
      owner: o2,
      vector,
      x: o2.x,
      y: o2.y,
      angle: o2.angle,
      color: 'rgba(255, 128, 96, 1)',
      size: 2,
    });

    this.stage.add(p);
  }

  // On collisions
  bindEvents() {
    window.addEventListener(
      'collision:hit',
      (event) => {
        const objects = event.detail.data;

        this.createProjectileEnemy(...objects);

        // Select by chance
        if (Math.random() > 0.5) {
          this.createProjectile2(...objects);
        } else {
          for (let i = 0; i < this.multiShot; i++) {
            this.createProjectile1(...objects);
          }
        }
      },
      true,
    );
  }
}
