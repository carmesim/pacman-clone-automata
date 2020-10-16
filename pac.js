class pac 
{
    constructor(color)
    {
        this.vel = 0.1;
        this.speedX = 1;
        this.speedY = 0;
        this.x = 2.5*sclX;
        this.y = 2.5*sclY;
        this.color = color;
    }
    dir(dirX, dirY){
        this.speedX = dirX;
        this.speedY = dirY;
        this.colisions();
    };

    update()
    {
        this.x += this.speedX*sclX;
        this.y += this.speedY*sclY;
        
        this.colisions();
        
        this.x = constrain(this.x,  2.5*sclX , map_width - 2.5*sclX )
        this.y = constrain(this.y, 2.5*sclY , map_height - 2.5*sclY )
    };

    move_if_possible(ndir)
    {
        let col_up    = img.get(this.x,this.y-25)[0] 
        let col_down  = img.get(this.x,this.y+25)[0] 
        let col_left  = img.get(this.x - 25,this.y)[0]
        let col_right = img.get(this.x + 25,this.y)[0]
        // Note that if the thickness of the wall is less than the radius of the player
        // some bugs can ocurr
        if(!((0 == col_up && ndir == 0) || (col_down == 0 && ndir ==1)|| (col_left == 0 && ndir == 2) ||(col_right == 0 && ndir == 3)))
        {
            this.move(ndir);
        }
        this.move(ndir);
    };

    draw()
    {
        fill(this.color);
        circle(this.x,this.y, r);
    };

    move(dir_v)
    {
       switch(dir_v)
       {
           case 0:  // Going up
               this.y -= this.y - this.vel >= r/2 ? this.vel*scl : 0;
            break;
            case 1: // Going down
                this.y += this.y + this.vel <= map_height - r/2 ? this.vel*scl : 0;
            break;
            case 2: // Going left
                this.x -= this.x - this.vel >= r/2 ? this.vel*scl : 0;
            break;
            case 3: // Going right
                this.x += this.x + this.vel <= map_width -r/2 ? this.vel*scl : 0;
            break;
            default:
                // Should be unreachable
            break;
       }
    };
    colisions(){
        let row = floor(this.y / sclY);
        let col = floor(this.x / sclX);
        console.clear();
        print('linha', row,'coluna: ', col);
        
        // This is ridiculous !!
        switch(row){
            case 2:
                if(col == 13 || col == 16){
                    this.speedX = 0;
                }else if((col >= 3 && col <= 6)|| (col >=8 && col <=12)|| (col >= 17 && col <= 21)|| (col >=23 && col <=26) ){
                    this.speedY = 0;
                }
                break;
            case 3:
                if(col == 2 || col ==7 || col == 13 || col == 16 ){
                    this.speedX = 0;
                }
                break;
      
        }
    }
}