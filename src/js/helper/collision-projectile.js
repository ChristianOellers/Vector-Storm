//@flow

class CollisionProjectile {
  constructor(params) {
    // Instance
    this.view = params.view; // Class: View
    this.player = params.player; // Class: *

    this.testType = 'Projectile';
    this.testOwner = 'Ship';
  }

  // Ships only (radiusRange)
  testObjects(objects) {
    const count = objects.length;

    for (let i = 0; i < count; i++) {
      const type = objects[i].__proto__.constructor.name;

      const owner = objects[i].owner.__proto__.constructor.name;

      if (type == this.testType && owner == this.testOwner) {
        this.testHit(objects[i]);
      }
    }
  }

  testHit(projectile) {
    const { player } = this;
    const size = player.sizeShip;
    const halfSize = player.sizeShip / 2;

    const { x } = projectile;
    const { y } = projectile;
    const pX = player.x;
    const pY = player.y;

    const hitX = x >= pX - halfSize && x <= pX + halfSize;
    const hitY = y >= pY - halfSize && y <= pY + halfSize;

    if (hitX && hitY) {
      player.takeHit();
    }
  }
}
