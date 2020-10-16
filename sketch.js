let player;
let dir = 2;
let r = 10;
let sclX;
let sclY;
let count = 0;
let dir_ai1;
let dir_ai2 = 1;
let img;
let color;

function preload() {
  img = loadImage('https://i.imgur.com/X6ZZWHF.png');
  
}
function setup() {
    createCanvas(360,397);
    sclX = width/28 - 1;
    sclY = 1.025*height/36 + 1;
    background(img);
    frameRate(4)
    player = new pac('yellow');
    ai1 = new pac('blue');
    dir_ai1 = 3;
    ideal_tracking = createVector(height/2, width/2);
}

function draw(){
    background(img);
    gridLines();
    // We could use a mask that is the img but with thicker walls
    //this way we can 'predict' if the player is close enough to a wall
    
    player.draw();
    player.update();
    //player.move_if_possible(dir);

    ai1.draw();
    // ai1.move_if_possible(dir_ai1);
    
    track(player.x, player.y);  // Updates ideal_tracking

    ai1.x = ideal_tracking.x;
    ai1.y = ideal_tracking.y;

    
    //count += 1;
}

// I believe that the obstacle checking will have to be inside this function
// cause the obstacle can be seen as a "you can't go to that direction" signal

function keyPressed() {
  if (keyCode === UP_ARROW) {
    dir = 0;
    player.dir(0,-1);
  } else if (keyCode === DOWN_ARROW) {
    dir = 1;
    player.dir(0,1);
  } else if (keyCode === LEFT_ARROW) {;
    dir = 2;
    player.dir(-1,0);
  } else if (keyCode === RIGHT_ARROW) {
    dir = 3;
    player.dir(1,0);
  }
  return false; // prevent default
}

//! track(int objX, int objY, int curX, int curY)
//! Returns the direction to go to in order to 
//! get closer to (objX, objY), the objective point.
function track(objX, objY)
{
  //! Finding the ideal point to go to
  var target = createVector(objX, objY);
  var distance = target.dist(ideal_tracking);
  var mapped_distance = map(distance, 100, 0, 1.5, 0.5);
  target.sub(ideal_tracking);
  target.normalize();
  target.mult(0.5*mapped_distance);
  ideal_tracking.add(target);
}
function gridLines(){
  stroke(50);
  for(let i = 0; i <= width + sclX; i += sclX){
    line(i,0, i, height);
  }
  for(let i = 0; i <= height + sclY; i += sclY){
    line(0,i, width, i);
  }

}
