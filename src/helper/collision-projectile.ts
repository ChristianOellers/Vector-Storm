/**
 *
 */
export default class CollisionProjectileHelper {
  view: any;
  player: any;
  testType: string;
  testOwner: string;

  /**
   *
   */
  constructor(params: any) {
    // Instance
    this.view = params.view; // Class: View
    this.player = params.player; // Class: *

    this.testType = 'ProjectileWeaponObject';
    this.testOwner = 'ShipEnemyObject';
  }

  /**
   * Ships only (radiusRange).
   */
  testObjects(objects: any) {
    const count: number = objects.length;

    for (let i = 0; i < count; i++) {
      const type: string = objects[i].__proto__.constructor.name;
      const owner: string = objects[i].owner && objects[i].owner.__proto__.constructor.name;

      if (type == this.testType && owner == this.testOwner) {
        this.testHit(objects[i]);
      }
    }
  }

  /**
   *
   */
  testHit(projectile: any) {
    const player: any = this.player;
    const halfSize: number = player.sizeShip / 2;

    const x: number = projectile.x;
    const y: number = projectile.y;
    const pX: number = player.x;
    const pY: number = player.y;

    const hitX: boolean = x >= pX - halfSize && x <= pX + halfSize;
    const hitY: boolean = y >= pY - halfSize && y <= pY + halfSize;

    if (hitX && hitY) {
      player.takeHit();
    }
  }
}
