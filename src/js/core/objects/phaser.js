// @flow
class Phaser {
  constructor(params) {
    // Instance
    this.view = params.view; // Class: View
    this.vector1 = params.vector1;
    this.vector2 = params.vector2;
    this.color = params.color;
    this.size = params.size || 1;
    this.lifespan = params.lifespan || 100;
    this.owner = params.owner; // Class: *

    // Values
    this.isDead = false;
  }

  draw() {
    if (this.isDead) {
      return;
    }

    const { ctx } = this.view;
    const v1 = this.vector1;
    const v2 = this.vector2;

    ctx.save();

    ctx.beginPath();
    ctx.globalAlpha = this.lifespan / 100;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.moveTo(v1.vx, v1.vy);
    ctx.lineTo(v2.vx, v2.vy);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  move() {
    this.lifespan--;

    if (this.lifespan <= 0) {
      this.isDead = true;
    }
  }
}
