class pac 
{
    //const States     = {"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4}
    constructor(color, initX, initY)
    {
        this.x = initX;
        this.y = initY;
        this.color = color;
        this.state = 1 //"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4
        this.rev_dir = 0;
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

    reverse_dir(dir)
    {
        switch(dir)
        {
            case Directions.Up:    return Directions.Down;
            case Directions.Down:  return Directions.Up;
            case Directions.Right: return Directions.Left;
            case Directions.Left:  return Directions.Right;
            default:
                //! Should be unreachable
                return dir;
        }
    };

    backtrack()
    {
        this.move(this.rev_dir);
    };

    //! Updates the behavior of a Ghost
    AI_update()
    {
        //! Primeiros devemos ver qual o estado do Pac-Man
        if(player.state == States.Normal)
        {
            //! Pac-Man normal, então a IA deve segui-lo
            this.state == States.Chase;
        } else {
            //! Pac-Man pegou o power-up, então a IA deve fugir
            this.state == States.Flee;
        }

        /*! Imagine que, do ponto onde a IA está, uma linha horizontal e uma linha vertical são desenhadas,
            de modo a definir quatro quadrantes. (é pleonasmo isso? kkkkkkk)
            Devemos encontrar em qual quadrante o Pac-Man está, de modo a seguir (ou fugir) de acordo.
        !*/
    
        const diff_x     = Math.abs(player.x, this.x);  //! Distância entre a coord. x entre os dois
        const diff_y     = Math.abs(player.y, this.y);  //! Distância entre a coord. y entre os dois
        const pacIsAbove = player.x < this.x;      //! Define se o Pac-Man está acima da IA
        const pacIsBelow = player.x > this.x;      //! Define se o Pac-Man está abaixo da IA
        const pacIsToTheRight = player.y > this.y; //! Define se o Pac-Man está à direita da IA
        const pacIsToTheLeft  = player.y < this.y; //! Define se o Pac-Man está à esquerda da IA
        
        var bestDirection;        //! A direção para ir que trará a IA mais próxima (ou mais longínqua) do Pac-Man
        var secondBestDirection;  //! A segunda melhor direção. Usada quando não for possível ir para a acima

        if (pacIsAbove && pacIsToTheRight)
        {
        //! Primeiro quadrante - Pac-Man acima e à direita
        //! Se perseguindo, a IA deve ir em direção à coordenada mais próxima do Pac-Man.
        //! Se fugindo, a IA deve ir em direção contrária à coordenada mais próxima do Pac-Man.
            if(diff_x > diff_y)
            {
                bestDirection = Directions.Right;
                secondBestDirection = Directions.Up;
            } else {
                bestDirection = Directions.Up;
                secondBestDirection = Directions.Right;
            }
        } else if (pacIsAbove && pacIsToTheLeft)
        {
        //! Segundo quadrante - Pac-Man acima e à esquerda
            if(diff_x > diff_y)
            {
                bestDirection = Directions.Left;
                secondBestDirection = Directions.Up;
            } else {
                bestDirection = Directions.Up;
                secondBestDirection = Directions.Left;
            }
        } else if (pacIsBelow && pacIsToTheRight)
        {
            //! Terceiro quadrante - Pac-Man abaixo e à direita
            if(diff_x > diff_y)
            {
                bestDirection = Directions.Right;
                secondBestDirection = Directions.Down;
            } else {
                bestDirection = Directions.Down;
                secondBestDirection = Directions.Right;
            }
        } else if (pacIsBelow && pacIsToTheLeft)
        {
            //! Último quadrante - Pac-Man abaixo e à esquerda
            if(diff_x > diff_y)
            {
                bestDirection = Directions.Left;
                secondBestDirection = Directions.Down;
            } else {
                bestDirection = Directions.Down;
                secondBestDirection = Directions.Left;
            }
        }

        var cur_pos_x = this.x; //! Posição atual em x
        var cur_pos_y = this.y; //! Posição atual em y

        //! Se perseguindo, a IA deve ir em direção à coordenada mais próxima do Pac-Man.
        //! Se fugindo, a IA deve ir em direção contrária à coordenada mais próxima do Pac-Man.
        this.move(bestDirection);
        var moved = this.x == cur_pos_x && this.y == cur_pos_y;

        if(!moved)
        {
            /*! Não foi possível mover para a direção dada acima, portanto tentamos mover para a outra melhor direção !*/
            cur_pos_x = this.x;
            cur_pos_y = this.y;
            moved = this.move(secondBestDirection);
            moved = this.x == cur_pos_x && this.y == cur_pos_y;
            if (!moved) {
                //! Ainda assim, não foi possível mover para a segunda direção :/ 
                //! Portanto movemos para onde a IA veio
                this.backtrack();
            }
        }
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
       this.rev_dir = this.reverse_dir(dir_v);
    };
    colisions(){
        let row = floor(this.y / sclY);
        let col = floor(this.x / sclX);
        console.clear();
        print('linha', row-1,'coluna: ', col-1);
    
    };
}