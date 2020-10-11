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

  constructor() {
    this.stage = new Stage();

    this.view = new View({
      domElementId: 'app',
    });

    new Controls({
      view: this.view,
    });

    const collisionBounce = new CollisionBounce();
    const collision = new Collision({
      view: this.view,
    });

    new Projectiles({
      projectile1: Projectile,
      projectile2: Phaser,
      stage: this.stage,
      view: this.view,
    });

    this.shipPlayer = new ShipPlayer({
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

    const collisionProjectile = new CollisionProjectile({
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

  setup() {
    const view = this.view;

    this.stage.add(this.shipPlayer);

    for (let i = 0; i < this.#config.enemies; i++) {
      const ship = new Ship({
        view,
        x: view.getRandomPositionX(20), // 20 = Ship size
        y: view.getRandomPositionY(20),
        id: i + 1,
      });

      this.stage.add(ship);
    }
  }

  run() {
    window.onload = () => {
      this.renderLoop.run();

      if (this.#config.runGame) {
        this.loop.run();
      }
    };
  }
}
