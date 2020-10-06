let sclX = 4;
let sclY = 8;
let palyer;
let dir = 2;
let r = 50;
let count = 0;
let dir_ai1;
let dir_ai2 = 1;
let img;
let colr;

function preload() {
  map = loadImage('https://i.imgur.com/nYu5dwI.png');
  
}
function setup() {
    createCanvas(400,800);
    background(map);
    player = new pac('yellow');
    ai1 = new pac('blue');
    dir_ai1 = 3;
}

function draw(){
    background(map);
    // We could use a mask that is the map but with thicker walls
    //this way we can 'predict' if the player is close enough to a wall
    colr = map.get(player.x,player.y) //gets the color of the player's position
    print(colr[0])
    player.draw(); 
    player.move(dir);
    ai1.draw();

    fill(colr);
    ellipse(50,50,50,50)
    ai1.move(dir_ai1);
    //ai2.draw();
    // ai2.move(dir_ai2)

    if(count % 33 == 0){
        dir_ai1 = floor(10*random())%4;
        count = 0
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
