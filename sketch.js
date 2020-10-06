let sclX = 4;
let sclY = 8;
let player;
let dir = 2;
let r = 50;
let count = 0;
let dir_ai1;
let dir_ai2 = 1;
let img;
let color;

function preload() {
  img = loadImage('https://i.imgur.com/566ucfj.png');
  
}
function setup() {
    createCanvas(400,800);
    background(img);
    player = new pac('yellow');
    ai1 = new pac('blue');
    dir_ai1 = 3;
}

function draw(){
    background(img);
    // We could use a mask that is the img but with thicker walls
    //this way we can 'predict' if the player is close enough to a wall
    
    player.draw(); 
    
    //this is ugly
    // maybe we should improve it and move to a function (or pac method)
    // this way we can apply it to the ai too
    player.move_if_possible(dir);
    
    ai1.draw();
    ai1.move_if_possible(dir_ai1);

    if(count % 33 == 0){
        dir_ai1 = floor(10*random())%4;
        count = 0;
    }
    
    count += 1;
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
