
class pac {
    
    constructor(color){
        this.vel = 2;
        this.x = width/2;
        this.y = height/2;
        this.color = color
    }

    draw(){
        fill(this.color);
        circle(this.x,this.y,r);

    };

    move(dir_v){
        
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