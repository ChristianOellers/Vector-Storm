import Vector2D from 'lib/vector2d';

/**
 * Collision detection + Bounce effect
 *
 * Todo
 * - Fix: Sometimes extreme vector values are created when objects collide
 *   for a longer time (around the circles tangent?)
 *
 * Source
 * - O'Reilly - Supercharged JavaScript Graphics - Raffaele Cecco
 */
export default class CollisionBounceHelper {
  score: number;

  /**
   *
   */
  constructor() {
    // Values
    this.score = 5;
  }

  /**
   *
   */
  testObjects(objects: any) {
    const vector: Vector2D = new Vector2D(0, 0);
    const count: number = objects.length;
    let distance: number = 0;

    // Check objects against each other.
    // Inner loop starts one past outer loop for efficient testing:
    // Prevent self and duplicate checks - A against B but not B against A
    for (let c = 0; c < count; c++) {
      const o1: any = objects[c];

      for (let i = c + 1; i < count; i++) {
        const o2 = objects[i];

        vector.x = o2.x - o1.x;
        vector.y = o2.y - o1.y;
        distance = vector.sizeSqrt();

        // Distance < sum of 2 radii = Collision
        // Move objects apart and bounce off each other
        if (distance < o1.radius + o2.radius) {
          vector.normalize();
          vector.scale(o1.radius + o2.radius - distance);
          vector.invert();

          o1.x += vector.x;
          o1.y += vector.y;

          this.bounce(o1, o2);
        }
      }
    }
  }

  /**
   * o1 = Moving/Player ship.
   */
  bounce(o1: any, o2: any) {
    const collisionAngle: number = Math.atan2(o1.y - o2.y, o1.x - o2.x);
    const length1: number = o1.velocityVector.sizeSqrt();
    const length2: number = o2.velocityVector.sizeSqrt();

    const directionAngle1: number = Math.atan2(o1.velocityVector.y, o1.velocityVector.x);
    const directionAngle2: number = Math.atan2(o2.velocityVector.y, o2.velocityVector.x);

    const newVx1: number = length1 * Math.cos(directionAngle1 - collisionAngle);
    const newVx2: number = length2 * Math.cos(directionAngle2 - collisionAngle);

    o1.velocityVector.y = length1 * Math.sin(directionAngle1 - collisionAngle);
    o2.velocityVector.y = length2 * Math.sin(directionAngle2 - collisionAngle);

    o1.velocityVector.x = ((o1.mass - o2.mass) * newVx1 + 2 * o2.mass * newVx2) / (o1.mass + o2.mass);
    o2.velocityVector.x = ((o2.mass - o1.mass) * newVx2 + 2 * o1.mass * newVx1) / (o1.mass + o2.mass);

    o1.velocityVector.rotate(collisionAngle);
    o2.velocityVector.rotate(collisionAngle);

    this.updateScore(o1, o2);
  }

  /**
   * o1 = Ship being hit.
   * o2 = Shooter.
   */
  updateScore(o1: any, o2: any) {
    const score: number = this.score;

    o1.score += score;
    o2.score -= score;

    this.triggerFx();
  }

  /**
   * Bind game events to internal callback functions.
   */
  triggerFx() {
    const el: HTMLElement = <HTMLElement>document.getElementById('fx');

    el.classList.add('shake');

    window.setTimeout(() => {
      el.classList.remove('shake');
    }, 1000);
  }
}
