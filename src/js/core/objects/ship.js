class Ship {
  constructor(params) {
    // Instance
    this.view = params.view; // Class: View
    this.x = params.x;
    this.y = params.y;
    this.id = params.id; // Internal
    this.color = params.color || '255, 192, 96';

    // Values
    this.direction = (-1 + Math.random() * 2) | 0;
    this.container = this.view.canvas;
    this.score = 0;
    this.radiusRange = 100; // Collision detection, Visual
    this.radius = 10; // Collision detection, Visual
    this.angle = 0; // Generated
    this.rotationSpeed = 5; // Factor
    this.direction = 1; // 1 | -1
    this.sizePoint = 4;
    this.sizeShip = 20;
    this.mass = 20; // ^= sizeShip
    this.speed = 0.5;
    this.velocityVector = new Vector2D(0, 0);
  }

  draw() {
    const { ctx } = this.view;
    const { sizePoint } = this;
    const { sizeShip } = this;
    const { color } = this;
    const score = Number.parseFloat(this.score).toFixed(1);

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.strokeStyle = `rgba(${color}, 1)`;
    ctx.fillStyle = `rgba(${color}, 0.25)`;
    ctx.lineWidth = 1;

    ctx.font = '8px Arial';
    ctx.fillText(this.id, sizeShip * 1.1, sizeShip * 1.2);
    ctx.fillText(score, sizeShip * 1.1, sizeShip * 1.7);

    ctx.rotate(this.angle);

    // Center
    ctx.fillStyle = `rgba(${color}, 1)`;
    ctx.fillRect(0 - sizePoint / 2, 0 - sizePoint / 2, sizePoint, sizePoint);

    // Shape
    ctx.beginPath();
    ctx.arc(0, 0, sizeShip, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    // Direction
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${color}, 0.5)`;
    ctx.moveTo(0, 0);
    ctx.lineTo(sizeShip * 2, 0);
    ctx.closePath();
    ctx.stroke();

    // Range
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${color}, 0.1)`;
    ctx.arc(0, 0, this.radius * 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  move() {
    this.moveControl();

    let angleRad = this.angle + (Math.PI / 180) * this.rotationSpeed * this.direction;
    let angleDeg = (angleRad * 180) / Math.PI;

    // Angle MUST be reset or all other calculations will break
    if (angleDeg > 360) {
      angleDeg -= 360;
    }

    angleRad = (angleDeg * Math.PI) / 180;

    this.angle = angleRad;
  }

  // Reposition
  // Y = Keep a bit buffer
  moveControl() {
    const { view } = this;
    const size = this.sizeShip;
    const bufferY = 3;

    this.y += this.speed;

    if (this.x < size || this.x >= view.width + size) {
      this.x = view.getRandomPositionX(size);
    }
    if (this.y >= view.height + size) {
      this.y = -view.getRandomPositionY(size) / 2;
    }
  }
}
