import Vector2D from 'lib/vector2d';

/**
 * Weapon type - Phaser.
 */
export default class PhaserWeaponObject {
  view: any;
  vector1: Vector2D;
  vector2: Vector2D;
  color: string;
  size: number;
  lifespan: number;
  owner: any;
  isDead: boolean;

  /**
   * Set view reference and object config.
   */
  constructor(params: any) {
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

  /**
   * Draw object.
   */
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
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Move as long as alive, else remove.
   */
  move() {
    this.lifespan--;

    if (this.lifespan <= 0) {
      this.isDead = true;
    }
  }
}
