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
let player_btn;
let ghost_btn;

function preload() {
  //https://i.imgur.com/X6ZZWHF.png
  img = loadImage('https://i.imgur.com/P6eL57x.png');
  mapa = loadJSON('Official_map.json')  
}
function setup() {
    createCanvas(601,397);
    sclX = map_width/28 - 1;
    sclY = 1.025*map_height/36 + 1;
    background(img);
    frameRate(10);

    player = new pac('yellow');
    aut = new automata(player);
    
    ai1 = new pac('red');
    dir_ai1 = 3;
    //ideal_tracking = createVector(map_height/2, map_width/2);
    player_btn = createButton('Pac');
    player_btn.position(map_width + 20, 185);
    player_btn.mousePressed(setPlayerAut);
    player_btn.style('background-color', "yellow");
    player_btn.style('border', "2px solid #4CAF50");
    player_btn.style('border-radius','12px');

    ghost_btn = createButton('Fantasma');
    ghost_btn.position(map_width + 20, 215);
    ghost_btn.mousePressed(setGhostAut);
    ghost_btn.style('background-color', "red");
    ghost_btn.style('border', "red");
    ghost_btn.style('border-radius','12px');
    
    

}

function draw(){
    background(img);
    gridLines();

    let row = floor(player.y / sclY);
    let col = floor(player.x / sclX);
    console.clear();
    print('linha', row-1,'coluna: ', col-1);
    print(mapa[row+3][col-2],mapa[row+3][col - 1], mapa[row+3][col] );
    print(mapa[row+4][col-2],mapa[row+4][col - 1], mapa[row+4][col] );
    print(mapa[row+5][col-2],mapa[row+5][col - 1], mapa[row+5][col] );
    // We could use a mask that is the img but with thicker walls
    //this way we can 'predict' if the player is close enough to a wall
    
    player.draw();
    player.move(dir);
    //player.update();

    aut.update();
    aut.draw();
    
    //player.move_if_possible(dir);

    ai1.draw();
    ai1.move(dir_ai1)
    // ai1.move_if_possible(dir_ai1);
    
    //track(player.x, player.y);  // Updates ideal_tracking

    //ai1.x = ideal_tracking.x;
    //ai1.y = ideal_tracking.y;

    if(count % 20 == 0){
        //dir_ai1 = floor(10*random())%4;
        if(dir_ai1 == 2){
            dir_ai1 = 3;
        }else{
            dir_ai1 = 2;
        }
        count = 0
    }
  
    count += 1;
}

// I believe that the obstacle checking will have to be inside this function
// cause the obstacle can be seen as a "you can't go to that direction" signal

function keyPressed() {
  let row = floor(player.y / sclY);
  let col = floor(player.x / sclX);
  if (keyCode === UP_ARROW) {
    if (mapa[row+3][col - 1] == 0){
      dir = 0;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (mapa[row+5][col - 1] == 0){
        dir = 1;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (mapa[row+4][col-2] == 0){
        dir = 2;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (mapa[row+4][col] == 0){
      dir = 3;
    }
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
function setPlayerAut(){
  aut.pac = player;
  ghost_btn.style('border', "red");
  player_btn.style('border', "2px solid #4CAF50");
}
function setGhostAut(){
  aut.pac = ai1;
  player_btn.style('border', "yellow");
  ghost_btn.style('border', "2px solid #4CAF50");
}
