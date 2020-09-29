//@flow

class View {
  constructor(params) {
    // Instance
    this.canvas = document.getElementById(params.domElementId);

    // Values
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  getRandomPositionX(buffer) {
    return -buffer * 2 + Math.random() * this.width + buffer;
  }

  getRandomPositionY(buffer) {
    return -buffer + Math.random() * this.height + buffer;
  }
}
