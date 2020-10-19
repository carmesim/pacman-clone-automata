let player;
let dir = 4;
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
let power_up_timer = 0;

function preload() {
  img = loadImage('https://i.imgur.com/P6eL57x.png');
  mapa = loadJSON('Official_map.json')  
}
function setup() {
    createCanvas(601,397);
    sclX = map_width/28 - 1; //calibrando o tamanho do mapa para bater com a matriz
    sclY = 1.025*map_height/36 + 1;
    background(img);
    frameRate(10);

    player = new pac('yellow',15.5*sclX,24.5*sclY);

    aut = new automata(player, false); // initially it's not a ghost
    
    ai1 = new pac('red',15.5*sclX,12.5*sclY); //criando o primeiro fantasma vermelho
    dir_ai1 = 2;
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
    //gridLines();

    let row = floor(player.y / sclY);
    let col = floor(player.x / sclX);

    // prints the surroundings of the player
    console.clear();
    print('PAC-MAN linha', row-1,'coluna: ', col-1); //esse print mostra a posição do pacman
    //print(mapa[row+3][col-2],mapa[row+3][col - 1], mapa[row+3][col] );
    //print(mapa[row+4][col-2],mapa[row+4][col - 1], mapa[row+4][col] );
    //print(mapa[row+5][col-2],mapa[row+5][col - 1], mapa[row+5][col] );

    player.draw();
    player.move(dir);

    if (mapa[row+4][col - 1] == 2){
      player.state = 4; // Powered-up !
      power_up_timer = 20;
    }
    print(aut.isGhost)
    aut.update();
    aut.draw();
    
    ai1.draw();
    ai1.move(dir_ai1)


    //vamos calcular a real posicao x e y do fantasmas
    let ghost_col = floor(ai1.x / sclX);
    let ghost_row = floor(ai1.y / sclY);

    print ('FANTASMA row: ', ghost_row - 1, 'col: ', ghost_col - 1);
    
    //track(player.x, player.y);  // Updates ideal_tracking

    //ai1.x = ideal_tracking.x;
    //ai1.y = ideal_tracking.y;

    if(count % 20 == 0){
        dir_ai1 = floor(10*random())%4;
        if(dir_ai1 == 2){
            dir_ai1 = 3;
        }else{
            dir_ai1 = 2;
        }
        count = 0
    }


    // this part will change with more ghosts
    // sorry, guys!
    if(power_up_timer > 0){
      power_up_timer --;
      power_up_timer%2 == 0? ai1.color = "blue": ai1.color = "white";
    }else if (power_up_timer == 0){
      player.state = 1;
      ai1.color = "red";
    }
  
    count += 1;
}

// I believe that the obstacle checking will have to be inside this function
// cause the obstacle can be seen as a "you can't go to that direction" signal

function keyPressed() {
  let row = floor(player.y / sclY);
  let col = floor(player.x / sclX);
  if (keyCode === UP_ARROW) {
    if (mapa[row+3][col - 1] != 1){
      dir = 0;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (mapa[row+5][col - 1] != 1){
        dir = 1;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (mapa[row+4][col-2] != 1){
        dir = 2;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (mapa[row+4][col] != 1){
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

// Sets the player's automata to be vizualized
function setPlayerAut(){
  aut.pac = player;
  aut.isGhost = false;
  ghost_btn.style('border', "red");
  player_btn.style('border', "2px solid #4CAF50");
}
// Sets the Ai1's automata to be vizualized
function setGhostAut(){
  aut.pac = ai1;
  aut.isGhost = true;
  player_btn.style('border', "yellow");
  ghost_btn.style('border', "2px solid #4CAF50");
}
