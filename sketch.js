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
let space_pressed = false;
let finished = false;

const _States     = {"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4}
const _Directions = {"Up":0, "Down": 1, "Left": 2, "Right": 3}

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
    gridLines();

    //vou fazer um grande if aqui para travar o codigo para garantir que ele encerre

    // prints the surroundings of the player
    player.draw();
    player.move(dir);

    let row = floor(player.y / sclY);
    let col = floor(player.x / sclX);

    if (mapa[row+4][col - 1] == 2){
      pac.state = 4; // Powered-up !
      power_up_timer = 20;
    }

    aut.update();
    aut.draw();
    
    //print(mapa[row+3][col-2],mapa[row+3][col - 1], mapa[row+3][col] );
    //print(mapa[row+4][col-2],mapa[row+4][col - 1], mapa[row+4][col] );
    //print(mapa[row+5][col-2],mapa[row+5][col - 1], mapa[row+5][col] );
    if (finished == true){ //quer dizer que acabou o jogo

        //texto de derrota
        textSize(32);
        fill ('yellow');
        text('Game Over', 88, map_height / 2);

        textSize(20);
        text('Pressione Espaço para reiniciar!', 36, 239);


        //reposicionar o pac man
        player.x = 15.5*sclX; //estou reposicionando o pacman para a posicao inicial
        player.y = 24.5*sclY;
        dir = 4;

        ai1.draw();  
        ai1.AI_update(player);

        //resetando o game
        if (space_pressed == true){
            finished = false;
        }

        // USAR ESSA ESTRUTURA PARA SABER A POSIÇÃO DO MOUSE AJUDA PARA CALIBRAR ESTITICA
        /*
        if (mouseIsPressed){
            print('Mouse X: ', mouseX, 'Y: ', mouseY);    
        }
        */

        //printar as coisas, reposicionar o pac man etc etc


    }

    else {

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
        


        //vamos calcular a real posicao x e y do fantasmas
        let ghost_col = floor(ai1.x / sclX);
        let ghost_row = floor(ai1.y / sclY);

        print ('FANTASMA row: ', ghost_row - 1, 'col: ', ghost_col - 1);
        
        //track(player.x, player.y);  // Updates ideal_tracking

        //ai1.x = ideal_tracking.x;
        //ai1.y = ideal_tracking.y;

        //isso eh o movimento aleatorio do fantasma
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


        if (pacMan_Ghost_Colision(row, col, ghost_row, ghost_col) == 1){ // houve colisão

            finished = true;
            space_pressed = false;
        }
    }
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
  } else if (keyCode == 32) { //se foi pressionado o espaço
    space_pressed = true;
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


function pacMan_Ghost_Colision (row, col, ghost_row, ghost_col) { //retorna 1 se o pacman bateu no fantasma

  if (row == ghost_row && col == ghost_col){
    return 1;
  }

}
