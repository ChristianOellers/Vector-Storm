import Vector2D from 'lib/vector2d';

/**
 * Generate weapon projectiles.
 */
export default class ProjectileGenerator {
  stage: any;
  view: any;
  projectile1: any;
  projectile2: any;
  multiShot: number;
  container: any;

  /**
   * Set object references and game mode settings.
   */
  constructor(params: any) {
    // Instance
    this.stage = params.stage;
    this.view = params.view; // Class: View
    this.projectile1 = params.projectile1; // Class: *
    this.projectile2 = params.projectile2; // Class: *
    this.multiShot = params.multiShot || 1 + ((Math.random() * 1) | 0); // Number

    // Values
    this.container = this.view.canvas;

    this.bindEvents();
  }

  /**
   * Create projectile for type 1.
   */
  createProjectile1(o1: any, o2: any) {
    const vector = new Vector2D(o2.x, o2.y);
    const rnd = -(Math.random() * 50) + 25;

    vector.x = o2.x - (o1.x + rnd);
    vector.y = o2.y - (o1.y + rnd);

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

  /**
   * Create projectile for type 2.
   */
  createProjectile2(o1: any, o2: any) {
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

  /**
   * Create enemy projectile (variation of type 1).
   */
  createProjectileEnemy(o1: any, o2: any) {
    const vector = new Vector2D(o1.x, o1.y);

    vector.x = o1.x - o2.x;
    vector.y = o1.y - o2.y;

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

  /**
   * On collisions.
   */
  bindEvents() {
    window.addEventListener(
      'collision:hit',
      (event: any) => {
        const objects: any = event.detail.data;

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
