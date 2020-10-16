let sclX = 4;
let sclY = 8;
let player;
let dir = 2;
let r = 8;
let count = 0;
let dir_ai1;
let dir_ai2 = 1;
let img;
let color;

function preload() {
  img = loadImage('https://i.imgur.com/uDuqWxR.png');
  
}
function setup() {
    createCanvas(164,212);
    background(img);
    frameRate(30)
    player = new pac('yellow');
    ai1 = new pac('blue');
    dir_ai1 = 3;
    ideal_tracking = createVector(height/2, width/2);
}

function draw(){
    background(img);
    // We could use a mask that is the img but with thicker walls
    //this way we can 'predict' if the player is close enough to a wall
    
    player.draw();

    player.move_if_possible(dir);

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
  } else if (keyCode === DOWN_ARROW) {
    dir = 1;
  } else if (keyCode === LEFT_ARROW) {;
    dir = 2;
  } else if (keyCode === RIGHT_ARROW) {
    dir = 3;
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
