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
let map_width = 360;
let map_height = 397;
let mapa;
let aut;

function preload() {
  //https://i.imgur.com/X6ZZWHF.png
  img = loadImage('https://i.imgur.com/P6eL57x.png');
  //mapa = loadJSON('lion.json')

  
}
function setup() {
    createCanvas(601,397);
    sclX = map_width/28 - 1;
    sclY = 1.025*map_height/36 + 1;
    background(img);
    frameRate(6);

    player = new pac('yellow');
    aut = new automata(player);
    
    //ai1 = new pac('blue');
    //ai1.dir()
    //dir_ai1 = 3;
    //ideal_tracking = createVector(map_height/2, map_width/2);
}

function draw(){
    background(img);
    gridLines();
    // We could use a mask that is the img but with thicker walls
    //this way we can 'predict' if the player is close enough to a wall
    
    player.draw();
    player.move(dir);
    //player.update();
  
    aut.update();
    aut.draw();
    
    //player.move_if_possible(dir);

    //ai1.draw();
    // ai1.move_if_possible(dir_ai1);
    
    //track(player.x, player.y);  // Updates ideal_tracking

    //ai1.x = ideal_tracking.x;
    //ai1.y = ideal_tracking.y;

    
    //count += 1;
}

// I believe that the obstacle checking will have to be inside this function
// cause the obstacle can be seen as a "you can't go to that direction" signal

function keyPressed() {
  if (keyCode === UP_ARROW) {
    dir = 0;
    //player.dir(0,-1);
  } else if (keyCode === DOWN_ARROW) {
    dir = 1;
    //player.dir(0,1);
  } else if (keyCode === LEFT_ARROW) {;
    dir = 2;
    //player.dir(-1,0);
  } else if (keyCode === RIGHT_ARROW) {
    dir = 3;
    //player.dir(1,0);
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
  for(let i = 0; i <= map_width + sclX; i += sclX){
    line(i,0, i, map_height);
  }
  for(let i = 0; i <= map_height + sclY; i += sclY){
    line(0,i, map_width, i);
  }
}


function getMap(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://raw.githubusercontent.com/carmesim/pacman-clone-automata/5a5a7802ab3fc30c8860deef9cad3a967252ac32/Mapa_Pac_man.txt', true);
  request.send(null);
  request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
          var type = request.getResponseHeader('Content-Type');
          if (type.indexOf("text") !== 1) {
              return request.responseText;
          }
      }
  }
}

