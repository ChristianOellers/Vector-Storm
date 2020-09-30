// @flow

class Collision {
  constructor(params) {
    // Instance
    this.view = params.view; // Class: View

    // Values
    this.playerType = 'ShipPlayer';
    this.score = 1;
  }

  // Ships only (radiusRange)
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
        // if (distance < (o1.radius + o2.radius)) {
        if (distance < o1.radiusRange + o2.radiusRange) {
          this.notify(o1, o2);
        }
      }
    }
  }

  // Check if direction of 2 circles are aligned.-
  //
  // Todo - Issues
  // - BOTH circles can match 'hit', although only one is pointing in the proper direction
  //
  // *1) Mirror angle by adding +180 fixes the calculation, although it now unwantedly works for both circles
  // *2) Angle MUST be reset or all other calculations will break
  notify(o1, o2) {
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

  // Used to distinct player from other objects
  // Other objects only interact with the player, but not with themselves
  hitToPlayer(o1, o2) {
    const { playerType } = this;

    return o1.__proto__.constructor.name === playerType || o2.__proto__.constructor.name === playerType;
  }

  // Connect circles that can hit each other
  draw(o1, o2) {
    const { ctx } = this.view;
    const v1 = new Vector2D(o1.x, o1.y);
    const v2 = new Vector2D(o2.x, o2.y);

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 128, 0, 1)';
    ctx.lineWidth = 1;
    ctx.moveTo(v1.vx, v1.vy);
    ctx.lineTo(v2.vx, v2.vy);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  drawPoint(x, y) {
    const { ctx } = this.view;
    const size = 4;

    ctx.save();

    // ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(x - size / 2, y - size / 2, size, size);

    ctx.restore();
  }

  dispatchHitEvent(o1, o2) {
    const ev = new CustomEvent('collision:hit', {
      detail: {
        data: [o1, o2],
      },
    });

    this.updateScore(o1, o2);

    window.dispatchEvent(ev);
  }

  // o1 = Shooter
  // o2 = Hit target
  updateScore(o1, o2) {
    o1.score += this.score;
    o2.score -= this.score;
  }
}
