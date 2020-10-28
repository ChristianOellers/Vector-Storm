/**
 * Handle canvas element and 2D drawing context.
 */
export default class ViewHelper {
  canvas: any;
  ctx: any;
  width: number;
  height: number;
  centerX: number;
  centerY: number;

  /**
   * Set canvas element reference and screen size.
   */
  constructor(params: any) {
    // Instance
    this.canvas = document.getElementById(params.domElementId);

    // Values
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  /**
   * Get random horizontal position on screen.
   * Respect object size to ensure it's always visible.
   */
  getRandomPositionX(objectSize: number) {
    return -objectSize * 2 + Math.random() * this.width + objectSize;
  }

  /**
   * Get random vertical position on screen.
   * Respect object size to ensure it's always visible.
   */
  getRandomPositionY(objectSize: number) {
    return -objectSize + Math.random() * this.height + objectSize;
  }
}
