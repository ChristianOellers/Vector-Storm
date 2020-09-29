// @flow
window.onload = () => {
  // -------------------------------------------------------------------------------------------------------------------------------- Config

  const config = {
    runGame: true,
    scoreWin: 200,
    scoreLose: -100,
    enemies: 5,
    debug: {
      useInterval: false,
    },
  };

  // ------------------------------------------------------------------------------------------------------------------------------ App core

  const collisionBounce = new CollisionBounce();
  const stage = new Stage();

  const view = new View({
    domElementId: 'app',
  });

  const controls = new Controls({
    view,
  });

  const collision = new Collision({
    view,
  });

  // ------------------------------------------------------------------------------------------------------------------ Generators

  const projectiles = new Projectiles({
    projectile1: Projectile,
    projectile2: Phaser,
    stage,
    view,
    multiShot: 1 + ((Math.random() * 1) | 0),
  });

  // --------------------------------------------------------------------------------------------------------------------------------- Scene

  const shipPlayer = new ShipPlayer({
    view,
    x: view.centerX + 20,
    y: view.centerY - 20,
    id: 0,
  });

  stage.add(shipPlayer);

  for (let i = 0; i < config.enemies; i++) {
    const ship = new Ship({
      view,
      x: view.getRandomPositionX(20), // 20 = Ship size
      y: view.getRandomPositionY(20),
      id: i + 1,
    });

    stage.add(ship);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------- Init

  const collisionProjectile = new CollisionProjectile({
    view,
    player: shipPlayer,
  });

  const score = new Score({
    view,
    player: shipPlayer,
    scoreWin: config.scoreWin,
    scoreLose: config.scoreLose,
  });

  const renderLoop = new RenderLoop({
    collision,
    collisionBounce,
    collisionProjectile,
    stage,
    view,
  });

  const loop = new Loop({
    score,
    renderLoop,
    useInterval: config.debug.useInterval,
  });

  // ------------------------------------------------------------------------------------------------------------------------- Run

  renderLoop.run();

  if (config.runGame) {
    loop.run();
  }
};
