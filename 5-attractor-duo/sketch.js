let magnetA;
let magnetB;
let boxes;


function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // no gravity
  engine.world.gravity.scale = 0;

  // add a group of identical boxes
  boxes = new Stack(
    world,
    { x: width/2, y: 100, cols: 10, rows: 10, colGap: 5, rowGap: 5, color: 'white',
      create: (x, y) => Matter.Bodies.rectangle(x, y, 25, 10, { restitution: 0.9 })
    }
  );

  // add magnets
  magnetA = new Magnet(
    world,
    { x: 200, y: height/2, r: 75, color: 'grey', attraction: 0.4 },
    { isStatic: true, mass: 10 }
  );
  magnetA.addAttracted(boxes.body.bodies);
  magnetB = new Magnet(
    world,
    { x: 600, y: height/2, r: 75, color: 'grey', attraction: 0.1 },
    { isStatic: true, mass: 10 }
  );
  magnetB.addAttracted(boxes.body.bodies);

  // add a mouse to manipulate Matter objects
  mouse = new Mouse(engine, canvas, { stroke: 'magenta', strokeWeight: 2 });

  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  background(0);

  magnetA.gravity();
  magnetB.gravity();
  magnetA.draw();
  magnetB.draw();
  boxes.draw();
  mouse.draw();
}
