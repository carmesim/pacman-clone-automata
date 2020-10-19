let player;
let dir = 4;
let r = 12;
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
let space_pressed = false;
let finished = false;
let won = 0; 
let ghosts_eaten = 0;

const _States = {
  "Normal" : 1,
  "Chase" : 2,
  "Flee" : 3,
  "Powered-Up" : 4
} 

const _Directions = {"Up" : 0, "Down" : 1, "Left" : 2, "Right" : 3}

function
preload() {
  img = loadImage('https://i.imgur.com/P6eL57x.png');
  mapa = loadJSON('Official_map.json')
}
function setup() {
  createCanvas(601, 397);
  sclX = map_width / 28 -
         1; // calibrando o tamanho do mapa para bater com a matriz
  sclY = 1.025 * map_height / 36 + 1;
  background(img);
  frameRate(10);

  player = new pac('yellow', 15.5 * sclX, 24.5 * sclY);

  aut = new automata(player, false); // initially it's not a ghost

  ai1 = new pac('red', 15.5 * sclX,
                12.5 * sclY); // criando o primeiro fantasma vermelho

  dir_ai1 = 2;
  // ideal_tracking = createVector(map_height/2, map_width/2);
  player_btn = createButton('Pac');
  player_btn.position(map_width + 20, 185);
  player_btn.mousePressed(setPlayerAut);
  player_btn.style('background-color', "yellow");
  player_btn.style('border', "2px solid #4CAF50");
  player_btn.style('border-radius', '12px');

  ghost_btn = createButton('Fantasma');
  ghost_btn.position(map_width + 20, 215);
  ghost_btn.mousePressed(setGhostAut);
  ghost_btn.style('background-color', "red");
  ghost_btn.style('border', "red");
  ghost_btn.style('border-radius', '12px');
}

function draw() {
  if (finished == true) {
    // texto de derrota

    fill(0);
    square (map_width / 2 -8, map_height / 2 -15, 18);
    
    textSize(32);
    fill('yellow');
    if (won) {
      text('You Win !', 102, map_height / 2);
    } else {
      text('Game Over', 88, map_height / 2);
    }
    textSize(20);
    text('Pressione Espaço para reiniciar!', 36, 239);

    // reposicionar o pac man
    player.x =
        15.5 * sclX; // estou reposicionando o pacman para a posicao inicial
    player.y = 24.5 * sclY;
    dir = 4;

    // fazendo o fantasma ficar parado
    dir_ai1 = 2;

    ai1.x = 15.5 * sclX;
    ai1.y = 12.5 * sclY;

    // resetando o game
    print ('ESPACO : ', space_pressed);
    if (space_pressed == true){
        finished = false;
        ghosts_eaten = 0;
    }


    // USAR ESSA ESTRUTURA PARA SABER A POSIÇÃO DO MOUSE AJUDA PARA CALIBRAR
    // ESTITICA
    /*
    if (mouseIsPressed){
        print('Mouse X: ', mouseX, 'Y: ', mouseY);
    }
    */
  }

  else {
    background(img);
    //gridLines();
    
    keyboardInputs();

    const row = floor(player.y / sclY);
    const col = floor(player.x / sclX);


    player.move(dir);
    player.draw();

    if (mapa[row + 4][col - 1] == 2) {
      player.state = 4; // Powered-up !
      power_up_timer = 30;
    }
    //print(aut.isGhost);
    aut.update();
    aut.draw();

    
      ai1.AIUpdate(player);
      ai1.draw();

      textSize(14);
      fill("yellow");
      stroke("yellow");
      text(ghosts_eaten,map_width/2 - 5, map_height/2 - 5);

      //vamos calcular a real posicao x e y do fantasmas
      let ghost_col = floor(ai1.x / sclX);
      let ghost_row = floor(ai1.y / sclY);

      print ('FANTASMA row: ', ghost_row - 1, 'col: ', ghost_col - 1);
      
      // this part will change with more ghosts
      // sorry, guys!
      if(power_up_timer > 0){
        power_up_timer --;
        power_up_timer%2 == 0? ai1.color = "blue": ai1.color = "white";
      }else if (power_up_timer == 0){
        player.state = 1;
        ai1.color = "red";
      }

      if (pacManGhostColision() == 1){ // houve colisão

          if(player.state == 4){ //caso tenha tido colisao mas o pac estava com power up
              ghosts_eaten++;
              space_pressed = false;

              if(ghosts_eaten == 3){ //nao tem mais fantasmas ganhamos o jogo
                  finished = true;
                  won = true;
                  ai1.state = 5;
                  aut.update();
                  aut.draw();
              }else{
                  ai1.state = 5;
                  aut.update();
                  aut.draw();
                  // reposiciona a IA
                  dir_ai1 = 2;
                  ai1.x = 15.5*sclX;
                  ai1.y = 12.5*sclY;
                  ai1.state = 1;
                  power_up_timer = 0;
                  player.state = 1;
              }

          }else{
              finished = true;
              space_pressed = false;
              won = false;
              player.state = 5;
              aut.update();
              aut.draw();
          }

      }
    
  }
}

function keyboardInputs() {
  let row = floor(player.y / sclY);
  let col = floor(player.x / sclX);
  if (keyIsDown(UP_ARROW)) {
    if (mapa[row + 3][col - 1] != 1) {
      dir = 0;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    if (mapa[row + 5][col - 1] != 1) {
      dir = 1;
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    if (mapa[row + 4][col - 2] != 1) {
      dir = 2;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (mapa[row + 4][col] != 1) {
      dir = 3;
    }
  } else{
    return false; // prevent default
  }
}
function keyPressed(){
  if (keyCode == 32) { // se foi pressionado o espaço
    space_pressed = true;
  }
}

function gridLines() {
  stroke(50);
  for (let i = 0; i <= map_width + sclX; i += sclX) {
    line(i, 0, i, map_height);
  }
  for (let i = 0; i <= map_height + sclY; i += sclY) {
    line(0, i, map_width, i);
  }
}

//! Sets the player's automata to be visualized
function setPlayerAut() {
  aut.pac = player;
  aut.isGhost = false;
  ghost_btn.style('border', "red");
  player_btn.style('border', "2px solid #4CAF50");
  background(img); 
  aut.update();
  aut.draw();
}

//! Sets the Ai1's automata to be visualized
function setGhostAut() {
  aut.pac = ai1;
  aut.isGhost = true;
  player_btn.style('border', "yellow");
  ghost_btn.style('border', "2px solid #4CAF50");
  background(img);
  aut.update();
  aut.draw();
}

function pacManGhostColision() {
  //print('P_x: ', player.x, 'P_y: ', player.y, '\nG_x: ', ai1.x, 'G_y: ', ai1.y);
  if (dist(player.x, player.y, ai1.x, ai1.y) <= 12.4) {
    console.log("collided!");
    return 1;
  }
  return 0;
}
