import Vector2D from 'lib/vector2d';

/**
 * Collisions with player ship and scoring.
 */
export default class CollisionHelper {
  view: any;
  playerType: string;
  scoreIncrement: number;

  /**
   * Set view reference.
   */
  constructor(params: any) {
    // Instance
    this.view = params.view; // Class: View

    // Values
    this.playerType = 'ShipPlayerObject';
    this.scoreIncrement = 1;
  }

  /**
   * Radius-based collision test for object.
   */
  testObjects(objects: any) {
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

        vector.x = o2.x - o1.x;
        vector.y = o2.y - o1.y;
        distance = vector.sizeSqrt();

        // Distance < sum of 2 radii = Collision
        // if (distance < (o1.radius + o2.radius)) {
        if (distance < o1.radiusRange + o2.radiusRange) {
          this.notify(o1, o2);
        }
      }
    }
  }

  /**
   * Check if direction of 2 circles are aligned.
   *
   * *1) Mirror angle by adding +180 fixes the calculation, although it now works for both circles (unwanted).
   * *2) Angle MUST be reset or all other calculations will break.
   *
   * @todo Issue: Both circles can match 'hit', although only one is pointing in the proper direction.
   */
  notify(o1: any, o2: any) {
    if (!this.hitToPlayer(o1, o2)) {
      return;
    }

    const t = 2; // +/-t° span to simplify hit testing with crude values
    let a = ((o1.angle * 180) / Math.PI) | 0;

    let r = (180 + (Math.atan2(o1.y - o2.y, o1.x - o2.x) * 180) / Math.PI) | 0; // *1

    // Reset to fix math
    if (a > 360) {
      a -= 360;
    }
    if (r > 360) {
      r -= 360;
    }

    if (a >= r - t && a <= r + t) {
      this.dispatchHitEvent(o1, o2);
    }
  }

  /**
   * Used to distinct player from other objects.
   * Other objects only interact with the player, but not with themselves.
   */
  hitToPlayer(o1: any, o2: any) {
    const { playerType } = this;

    return o1.__proto__.constructor.name === playerType || o2.__proto__.constructor.name === playerType;
  }

  /**
   * Publish collision event.
   */
  dispatchHitEvent(o1: any, o2: any) {
    const ev = new CustomEvent('collision:hit', {
      detail: {
        data: [o1, o2],
      },
    });

    this.updateScore(o1, o2);

    window.dispatchEvent(ev);
  }

  /**
   * o1 = Shooter
   * o2 = Hit target
   */
  updateScore(o1: any, o2: any) {
    o1.score += this.scoreIncrement;
    o2.score -= this.scoreIncrement;
  }
}
