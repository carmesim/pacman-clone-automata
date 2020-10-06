
class pac 
{
    constructor(color)
    {
        this.vel = 5;
        this.x = width/2;
        this.y = height/2;
        this.color = color;
    }

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
    };

    draw()
    {
        fill(this.color);
        circle(this.x,this.y, r);
    };

    move(dir_v){
       switch(dir_v)
       {
           case 0:  // Going up
               this.y -= this.y - this.vel >= r/2 ? this.vel : 0;
            break;
            case 1: // Going down
                this.y += this.y + this.vel <= height - r/2 ? this.vel : 0;
            break;
            case 2: // Going left
                this.x -= this.x - this.vel >= r/2 ? this.vel : 0;
            break;
            case 3: // Going right
                this.x += this.x + this.vel <= width -r/2 ? this.vel : 0;
            break;
            default:
                // Should be unreachable
            break;
       }
    };
}