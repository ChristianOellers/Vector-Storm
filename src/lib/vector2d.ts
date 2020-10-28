/**
 * 2D vector calculations.
 *
 * @todo Add project/reflect calculations
 */
export default class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    const x = this.x;
    const y = this.y;
    const size = Math.sqrt(x * x + y * y);

    if (size !== 0) {
      this.x /= size;
      this.y /= size;
    }
  }

  add(vector: Vector2D) {
    this.x += vector.x;
    this.y += vector.y;
  }

  subtract(vector: Vector2D) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  crossProduct(vector: Vector2D) {
    return this.x * vector.y - this.y * vector.x;
  }

  dotProduct(vector: Vector2D) {
    return this.x * vector.x + this.y * vector.y;
  }

  invert() {
    this.x = -this.x;
    this.y = -this.y;
  }

  rotate(angleRadians: number) {
    const x = this.x;
    const y = this.y;
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);

    this.x = x * cos - y * sin;
    this.y = y * cos + x * sin;
  }

  scale(factor: number) {
    this.x *= factor;
    this.y *= factor;
  }

  sizeSqrt() {
    const x = this.x;
    const y = this.y;

    return Math.sqrt(x * x + y * y);
  }

  sizeSquared() {
    const x = this.x;
    const y = this.y;

    return x * x + y * y;
  }
}
