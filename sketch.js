let sclX = 4;
let sclY = 8;
let palyer;
let dir = 2;
let r = 50;
let count = 0;
let dir_ai1 = 3;
let dir_ai2 = 1;
function setup (){
    createCanvas(400,800);
    background(0);
    player = new pac('yellow');
    ai1 = new pac('blue');
}

function draw(){
    background(0);
    player.draw(); 
    player.move(dir);
    print(dir)
    ai1.draw();
    // //(10*random())%4
    ai1.move(dir_ai1);
    //ai2.draw();
    // ai2.move(dir_ai2)

    if(count % 33 == 0){
        dir_ai1 = (10*random())%4;
        count = 0
    }
    
    count += 1;

}

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

function pac (color){
    this.vel = 2;
    this.x = width/2;
    this.y = height/2;
    this.color = color

    this.draw = function(){
        fill(this.color);
        circle(this.x,this.y,r);

    };

    this.move = function(dir_v){
        if (dir_v == 0) {
            next_y  = this.y - this.vel;
            if(next_y >= r/2){
                this.y = next_y;
            }
        } else if (dir_v == 1) {
            next_y  = this.y + this.vel;
            if(next_y <= height - r/2){
                this.y = next_y;
            }
        } else if (dir_v == 2) {;
            next_x  = this.x - this.vel;
            if(next_x >= r/2){
                this.x = next_x;
            }
        } else if (dir_v == 3) {
            next_x  = this.x + this.vel;
            if(next_x <= width - r/2){
                this.x = next_x;
            }
        }
    };
}