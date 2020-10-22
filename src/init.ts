// Core / Generators
import ProjectileGenerator from './core/generator/projectile.ts';

// Core / Objects
import ShipEnemyObject from './core/objects/ships/enemy';
import ShipPlayerObject from './core/objects/ships/player';
import PhaserWeaponObject from './core/objects/weapons/phaser';
import ProjectileWeaponObject from './core/objects/weapons/projectile';

// Core
import Controls from './core/controls';
import Loop from './core/loop';
import RenderLoop from './core/render-loop';
import Score from './core/score';
import Stage from './core/stage';

// Helper
import CollisionHelper from './helper/collision';
import CollisionBounceHelper from './helper/collision-bounce';
import CollisionProjectileHelper from './helper/collision-projectile';
import ViewHelper from './helper/view';

/**
 *
 */
export default class Init {
  #config = {
    runGame: true,
    scoreWin: 200,
    scoreLose: -100,
    enemies: 5,
    debug: {
      useInterval: false,
    },
  };

  loop: any;
  renderLoop: any;
  shipPlayer: any;
  stage: any;
  view: any;

  /**
   *
   */
  constructor() {
    this.stage = new Stage();

    this.view = new ViewHelper({
      domElementId: 'app',
    });

    new Controls({
      view: this.view,
    });

    const collisionBounce = new CollisionBounceHelper();
    const collision = new CollisionHelper({
      view: this.view,
    });

    new ProjectileGenerator({
      projectile1: ProjectileWeaponObject,
      projectile2: PhaserWeaponObject,
      stage: this.stage,
      view: this.view,
    });

    this.shipPlayer = new ShipPlayerObject({
      view: this.view,
      x: this.view.centerX + 20,
      y: this.view.centerY - 20,
      id: 0,
    }); 

    const score = new Score({
      view: this.view,
      player: this.shipPlayer,
      scoreWin: this.#config.scoreWin,
      scoreLose: this.#config.scoreLose,
    });

    const collisionProjectile = new CollisionProjectileHelper({
      view: this.view,
      player: this.shipPlayer,
    });

    this.renderLoop = new RenderLoop({
      collision,
      collisionBounce,
      collisionProjectile,
      stage: this.stage,
      view: this.view,
    });

    this.loop = new Loop({
      score,
      renderLoop: this.renderLoop,
      useInterval: this.#config.debug.useInterval,
    });
  }

  /**
   *
   */
  init() {
    this.setup();
    this.start();
  }

  /**
   *
   */
  setup() {
    const view = this.view;

    this.stage.add(this.shipPlayer);

    for (let i = 0; i < this.#config.enemies; i++) {
      const ship = new ShipEnemyObject({
        view,
        x: view.getRandomPositionX(20), // 20 = Ship size
        y: view.getRandomPositionY(20),
        id: i + 1,
      });

      this.stage.add(ship);
    }
  }

  /**
   *
   */
  start() {
    window.onload = () => {
      this.renderLoop.run();

      if (this.#config.runGame) {
        this.loop.run();
      }
    };
  }
}
