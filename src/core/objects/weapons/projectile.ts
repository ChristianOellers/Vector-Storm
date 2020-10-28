import Vector2D from 'lib/vector2d';

/**
 * Weapon type - Projectile.
 */
export default class ProjectileWeaponObject {
  view: any;
  x: number;
  y: number;
  angle: number;
  velocityVector: Vector2D;
  color: string;
  size: number;
  owner: any;
  radius: number;
  thrust: number;
  isDead: boolean;

  /**
   * Set view reference and object config.
   */
  constructor(params: any) {
    // Instance
    this.view = params.view; // Class: View
    this.x = params.x;
    this.y = params.y;
    this.angle = params.angle;
    this.velocityVector = params.vector;
    this.color = params.color;
    this.size = params.size;
    this.owner = params.owner; // Class: *

    // Values
    this.radius = 4;
    this.thrust = 1.005;
    this.isDead = false;
  }

  /**
   * Draw object.
   */
  draw() {
    const { ctx } = this.view;
    const { x } = this;
    const { y } = this;
    const { color } = this;
    const { size } = this;
    const sizeScale = 1.25;

    ctx.save();
    ctx.translate(x, y);

    ctx.globalAlpha = Math.random() * 1.5;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(-size / 2, -size / 2, size, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalAlpha = Math.sin(x);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc((-size * sizeScale) / 2, (-size * sizeScale) / 2, size * sizeScale, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    ctx.fillRect(-2, -2, 2, 2);

    ctx.restore();
  }

  /**
   * Move object.
   */
  move() {
    this.x += this.velocityVector.x;
    this.y += this.velocityVector.y;

    this.velocityVector.scale(this.thrust);
  }
}
