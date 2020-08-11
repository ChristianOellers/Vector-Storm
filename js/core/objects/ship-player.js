class ShipPlayer {
  
  constructor (params) {
    // Instance
    this.view = params.view; // Class: View
    this.x    = params.x;
    this.y    = params.y;
    this.id   = params.id;   // Internal

    // Values
    this.container      = this.view.canvas;
    this.score          = 0;
    this.radiusRange    = 100; // Collision detection, Visual
    this.radius         = 10;  // Collision detection, Visual
    this.angle          = 0;   // Generated
    this.rotationSpeed  = 5;   // Factor
    this.direction      = 1;   // 1 | -1
    this.sizePoint      = 4;
    this.sizeShip       = 10;
    this.mass           = 10;  // ^= sizeShip
    this.mouseX         = 0;
    this.mouseY         = 0;
    this.speedMax       = 5;
    this.thrustBoost    = 0.1;
    this.thrust         = new Vector2D(0, 0, 15, 15);
    this.velocityVector = new Vector2D(0, 0);
    this.gravity        = 0.97;
    
    // States
    this.isMovingFastTime = 2000; // ^= Render loop
    this.isMovingFast     = false;
    this.isTransitioning  = false;
    this.transitionTime   = 1000;
    this.timeInState      = 0;
    this.state            = 'idle'; // 'hit'

    this.bindEvents();
  }


  draw () {
    const ctx       = this.view.ctx;
    const sizePoint = this.sizePoint;
    const sizeShip  = this.sizeShip;
    const score     = Number.parseFloat(this.score).toFixed(1);

    ctx.save();
    
      ctx.translate(this.x, this.y);

      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillStyle   = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth   = 1;

      ctx.font = '8px Arial';
      ctx.fillText(score, sizeShip * 1.2, sizeShip * 1.2);

      ctx.rotate(this.angle);

      // Center
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0 - sizePoint / 2, 0 - sizePoint / 2, sizePoint, sizePoint);

      this.drawState();

      // Direction
      ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.moveTo(0, 0);
        ctx.lineTo(sizeShip * 2, 0);
      ctx.closePath();
      ctx.stroke();

    ctx.restore();
  }
  
  
  drawState () {
    const ctx       = this.view.ctx;
    const sizePoint = this.sizePoint;
    const sizeShip  = this.sizeShip;
    
    let sizeShape   = sizeShip;
    let sizeRange   = this.radius * 10;
    let alphaCenter = 0.25;
    let alphaRange  = 0.1;
    let colorRed    = 255;
    let percent;
    
    
    this.timeInState *= 0.9;

    if (this.timeInState > 0) {
      let percent = this.timeInState / this.transitionTime;

      if (this.state === 'hit') {
        sizeShape   = sizeShip / 1.5  + sizeShip * percent;
        sizeRange   = sizeRange / 1.5 + sizeRange * percent;
        alphaRange  = alphaRange  + 1 * percent;
        alphaCenter = alphaCenter + 1 * percent;
        colorRed    = 255 - (128 * percent);
      }
    }
    
    // Shape
    ctx.beginPath();
      ctx.arc(0, 0, sizeShape, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    // Shape - Center
    ctx.fillStyle = 'rgba('+ colorRed +', 255, 255, ' + alphaCenter + ')';
    ctx.fill();

    // Range
    ctx.beginPath();
      ctx.strokeStyle = 'rgba(' + colorRed + ', 255, 255, ' + alphaRange + ')';
      ctx.arc(0, 0, sizeRange, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }


  move () {
    this.moveControl();

    let angleRad = this.angle + (Math.PI / 180) * this.rotationSpeed * this.direction;
    let angleDeg = angleRad * 180 / Math.PI;
    
    // Angle MUST be reset or all other calculations will break
    if (angleDeg > 360) {
      angleDeg -= 360;
    }

    angleRad = angleDeg * Math.PI / 180;

    this.angle = angleRad;
  }
  
  
  moveControl () {
    const speedMax = this.speedMax;
    const speed    = 0;

    this.x += this.velocityVector.vx;
    this.y += this.velocityVector.vy;
    
    this.velocityVector.scale(this.gravity);
    this.velocityVector.add(this.thrust);

    this.speed = this.velocityVector.size();

    if (this.speed > speedMax) {
      this.velocityVector.normalize();
      this.velocityVector.scale(speedMax);
    }
  }


  setFastMove () {
    if (this.isMovingFast) {
      return;
    }
    console.log("MOVEFAST");
    
    this.velocityVector.scale(2);
    this.isMovingFast = true;
    
    window.setTimeout( () => {
      this.velocityVector.scale(0.9);
      this.isMovingFast = false;
    }, this.isMovingFastTime);
  }


  // --------------------------------------------------------------------------------------------------------------------------- Hit testing
  
  takeHit () {
    if (!this.isTransitioning) {
      this.isTransitioning = true;

      // Score
      this.score -= 10;

      // State
      this.state       = 'hit';
      this.timeInState = this.transitionTime;
      
      setTimeout(() => {
        this.state           = 'idle';
        this.isTransitioning = false;
        this.timeInState     = 0;
      }, this.transitionTime);
      
      this.triggerFx();
    }
  }


  // Bind game events to internal callback functions
  triggerFx () {
    const el = document.getElementById('fx');
    
    el.classList.add('shake');

    window.setTimeout(() => {
      el.classList.remove('shake');
    }, 100);
  }

  
  // -------------------------------------------------------------------------------------------------------------------------- Controllable

  // Bind game events to internal callback functions
  bindEvents () {
    const container = this.container;

    container.addEventListener('mousedown', (event) => {
      this.onFlyStart();
    }, true);
    
    container.addEventListener('mouseup', (event) => {
      this.onFlyStop();
    }, true);
    
    container.addEventListener('mousemove', (event) => {
      this.onMove(event);
    }, true);
    
    window.addEventListener('controls:keydown', (event) => {
      const ev = event.detail.data;

      if (ev.shiftKey) {
        this.setFastMove();
      }

    }, true);
  }


  // Set mouse position within view
  onMove (event) {
    const bounds = this.view.canvas.getBoundingClientRect();

    this.mouseX = (event.clientX - bounds.left);
    this.mouseY = (event.clientY - bounds.top);
  }


  // Create new thrust vector
  onFlyStart (_event) {
    let thrust = this.thrust;

    thrust = new Vector2D(this.mouseX - this.x, this.mouseY - this.y);
    
    thrust.normalize();
    thrust.scale(this.thrustBoost);
    
    this.thrust = thrust;
  }


  // Reset thrust
  onFlyStop (_event) {
    this.thrust = new Vector2D(0, 0);
  }

}

