window.onload = () => {

  // -------------------------------------------------------------------------------------------------------------------------------- Config

  const config = {
    runGame   : true,
    scoreWin  : 200,
    scoreLose : -100,
    enemies   : 5,
    debug : {
      useInterval : false,
    }
  };
  
  
  // ------------------------------------------------------------------------------------------------------------------------------ App core

  const collisionBounce = new CollisionBounce();
  const stage           = new Stage();
  const view            = new View({ domElementId : 'app' });
  const controls        = new Controls({ view : view });

  const collision = new Collision({ 
    view : view,
  });


  // ------------------------------------------------------------------------------------------------------------------ Generators

  const projectiles = new Projectiles({ 
    projectile1 : Projectile,
    projectile2 : Phaser,
    stage       : stage,
    view        : view,
    multiShot   : 1 + (Math.random() * 1 | 0),
  });


  // --------------------------------------------------------------------------------------------------------------------------------- Scene

  const shipPlayer = new ShipPlayer({
    view : view,
    x    : view.centerX + 20,
    y    : view.centerY - 20,
    id   : 0,
  });

  stage.add(shipPlayer);


  for (let i = 0; i < config.enemies; i++) {
    let ship = new Ship({
      view : view,
      x    : view.getRandomPositionX(20), // 20 = Ship size
      y    : view.getRandomPositionY(20),
      id   : i + 1,
    });

    stage.add(ship);
  }


  // ---------------------------------------------------------------------------------------------------------------------------------- Init
  
  const collisionProjectile = new CollisionProjectile({ 
    view   : view,
    player : shipPlayer,
  });
  
  const score = new Score({
    view      : view,
    player    : shipPlayer,
    scoreWin  : config.scoreWin,
    scoreLose : config.scoreLose,
  });


  const renderLoop = new RenderLoop({
    collision           : collision,
    collisionBounce     : collisionBounce,
    collisionProjectile : collisionProjectile,
    stage : stage,
    view  : view,
  });

  const loop = new Loop({
    score       : score,
    renderLoop  : renderLoop,
    useInterval : config.debug.useInterval,
  });


  // ------------------------------------------------------------------------------------------------------------------------- Run
  
  renderLoop.run();
  
  if (config.runGame) {
    loop.run();
  }

};

