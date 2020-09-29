//@flow

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
class CollisionBounce {
  constructor() {
    // Values
    this.score = 5;
  }

  testObjects(objects) {
    const vector = new Vector2D(0, 0);
    const count = objects.length;
    let distance = 0;

    // Check objects against each other.
    // Inner loop starts one past outer loop for efficient testing:
    // Prevent self and duplicate checks - A against B but not B against A
    for (let c = 0; c < count; c++) {
      const o1 = objects[c];

      for (let i = c + 1; i < count; i++) {
        const o2 = objects[i];

        vector.vx = o2.x - o1.x;
        vector.vy = o2.y - o1.y;
        distance = vector.size();

        // Distance < sum of 2 radii = Collision
        // Move objects apart and bounce off each other
        if (distance < o1.radius + o2.radius) {
          vector.normalize();
          vector.scale(o1.radius + o2.radius - distance);
          vector.negate();

          o1.x += vector.vx;
          o1.y += vector.vy;

          this.bounce(o1, o2);
        }
      }
    }
  }

  // o1 = Moving/Player ship
  bounce(o1, o2) {
    const collisionAngle = Math.atan2(o1.y - o2.y, o1.x - o2.x);
    const length1 = o1.velocityVector.size();
    const length2 = o2.velocityVector.size();

    const directionAngle1 = Math.atan2(o1.velocityVector.vy, o1.velocityVector.vx);
    const directionAngle2 = Math.atan2(o2.velocityVector.vy, o2.velocityVector.vx);

    const newVx1 = length1 * Math.cos(directionAngle1 - collisionAngle);
    const newVx2 = length2 * Math.cos(directionAngle2 - collisionAngle);

    o1.velocityVector.vy = length1 * Math.sin(directionAngle1 - collisionAngle);
    o2.velocityVector.vy = length2 * Math.sin(directionAngle2 - collisionAngle);

    o1.velocityVector.vx = ((o1.mass - o2.mass) * newVx1 + 2 * o2.mass * newVx2) / (o1.mass + o2.mass);
    o2.velocityVector.vx = ((o2.mass - o1.mass) * newVx2 + 2 * o1.mass * newVx1) / (o1.mass + o2.mass);

    o1.velocityVector.rotate(collisionAngle);
    o2.velocityVector.rotate(collisionAngle);

    this.updateScore(o1, o2);
  }

  // o1 = Ship being hit
  // o2 = Shooter
  updateScore(o1, o2) {
    const { container } = this;
    const { score } = this;

    o1.score += score;
    o2.score -= score;

    this.triggerFx();
  }

  // Bind game events to internal callback functions
  triggerFx() {
    const el = document.getElementById('fx');

    el.classList.add('shake');

    window.setTimeout(() => {
      el.classList.remove('shake');
    }, 1000);
  }
}
