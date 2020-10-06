
class pac 
{
    constructor(color)
    {
        this.vel = 5;
        this.x = width/2;
        this.y = height/2;
        this.color = color;
    }

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