class pac 
{
    //const States     = {"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4}
    constructor(color, initX, initY)
    {
        this.x = initX;
        this.y = initY;
        this.color = color;
        this.state = 1 //"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4
    }

    // This method is deactivated for now

    // move_if_possible(ndir)
    // {
    //     let col_up    = img.get(this.x,this.y-25)[0] 
    //     let col_down  = img.get(this.x,this.y+25)[0] 
    //     let col_left  = img.get(this.x - 25,this.y)[0]
    //     let col_right = img.get(this.x + 25,this.y)[0]
    //     // Note that if the thickness of the wall is less than the radius of the player
    //     // some bugs can ocurr
    //     if(!((0 == col_up && ndir == 0) || (col_down == 0 && ndir ==1)|| (col_left == 0 && ndir == 2) ||(col_right == 0 && ndir == 3)))
    //     {
    //         this.move(ndir);
    //     }
    //     this.move(ndir);
    // };

    draw()
    {
        fill(this.color);
        circle(this.x,this.y, r);
        
    };

    move(dir_v)
    {
        let row = floor(this.y / sclY);
        let col = floor(this.x / sclX);
       switch(dir_v)
       {
            case 0:  // Going up
                
                if (mapa[row+3][col - 1] != 1){
                    this.y -= sclY ;
                }
                break;
            case 1: // Going down
                if (mapa[row+5][col - 1] != 1){
                    this.y += sclY;
                }
                break;
            case 2: // Going left
                if (row == 15 && col == 2){
                    this.x =  27.5*sclX;
                }
                if (mapa[row+4][col-2] != 1){
                    this.x -= sclX;
                }
                break;
            case 3: // Going right
                if (row == 15 && col == 27){
                    this.x =  2.5*sclX;
                }
                if (mapa[row+4][col] != 1){
                    this.x += sclX;
                }
                break;
            default:
                // Should be unreachable
                break;
       }
       this.x = constrain(this.x,2.5*sclX , 27.5*sclX );
       this.y = constrain(this.y,2.5*sclY , 29.5*sclY);
    };
    colisions(){
        let row = floor(this.y / sclY);
        let col = floor(this.x / sclX);
        console.clear();
        print('linha', row-1,'coluna: ', col-1);
    
    };
}