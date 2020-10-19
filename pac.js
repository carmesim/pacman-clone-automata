class pac 
{
    //const _States     = {"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4, "Dead": 5}
    constructor(color, initX, initY)
    {
        this.x = initX;
        this.y = initY;
        this.color = color;
        this.state = 1 //"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4
        this.rev_dir = 0;               //! Direção contrária. Usada por backtrack()
        this.backtracktimer = 0;        //! Define por quanto tempo iremos para a direção do backtrack
    }

    draw()
    {
        fill(this.color);
        circle(this.x,this.y, r);
    };

    reverse_dir(dir)
    {
        switch(dir)
        {
            case _Directions.Up:    return _Directions.Down;
            case _Directions.Down:  return _Directions.Up;
            case _Directions.Right: return _Directions.Left;
            case _Directions.Left:  return _Directions.Right;
            default:
                //! Should be unreachable
                return dir;
        }
    };

    backtrack(dir1, dir2)
    {
        while(true)
        {
            var newDir = Math.floor(Math.random() * 5);
            if (newDir !== dir1 && newDir !== dir2)
            {
                break;
            }
        }
        this.rev_dir = newDir;
        this.backtracktimer = 10;
        this.move(newDir);
    };

    //! Updates the behavior of a Ghost
    AIUpdate(pacman)
    {
        if(this.backtracktimer > 0)
        {
            console.log("backtracker timer > 0");
            this.backtracktimer--;
            this.move(this.rev_dir);
            return;
        }
        //! Primeiros devemos ver qual o estado do Pac-Man
        if(pacman.state == _States.Normal)
        {
            //! Pac-Man normal, então a IA deve segui-lo
            this.state = _States.Chase;
        } else {
            //! Pac-Man pegou o power-up, então a IA deve fugir
            this.state = _States.Flee;
        }

        /*! Imagine que, do ponto onde a IA está, uma linha horizontal e uma linha vertical são desenhadas,
            de modo a definir quatro quadrantes. (é pleonasmo isso? kkkkkkk)
            Devemos encontrar em qual quadrante o Pac-Man está, de modo a seguir (ou fugir) de acordo.
        !*/
    
        const diff_x     = Math.abs(pacman.x, this.x);  //! Distância entre a coord. x entre os dois
        const diff_y     = Math.abs(pacman.y, this.y);  //! Distância entre a coord. y entre os dois
        const pacIsAbove = pacman.y < this.y;      //! Define se o Pac-Man está acima da IA
        const pacIsBelow = !pacIsAbove;            //! Define se o Pac-Man está abaixo da IA
        const pacIsToTheRight = pacman.x > this.x; //! Define se o Pac-Man está à direita da IA
        const pacIsToTheLeft  = !pacIsToTheRight;  //! Define se o Pac-Man está à esquerda da IA
        
        var bestDirection;        //! A direção para ir que trará a IA mais próxima (ou mais longínqua) do Pac-Man
        var secondBestDirection;  //! A segunda melhor direção. Usada quando não for possível ir para a acima

        if (pacIsAbove && pacIsToTheRight)
        {
        //! Primeiro quadrante - Pac-Man acima e à direita
        //! Se perseguindo, a IA deve ir em direção à coordenada mais próxima do Pac-Man.
        //! Se fugindo, a IA deve ir em direção contrária à coordenada mais próxima do Pac-Man.
            if(diff_x > diff_y)
            {
                bestDirection = _Directions.Right;
                secondBestDirection = _Directions.Up;
            } else {
                bestDirection = _Directions.Up;
                secondBestDirection = _Directions.Right;
            }
        } else if (pacIsAbove && pacIsToTheLeft)
        {
        //! Segundo quadrante - Pac-Man acima e à esquerda
            if(diff_x > diff_y)
            {
                bestDirection = _Directions.Left;
                secondBestDirection = _Directions.Up;
            } else {
                bestDirection = _Directions.Up;
                secondBestDirection = _Directions.Left;
            }
        } else if (pacIsBelow && pacIsToTheRight)
        {
            //! Terceiro quadrante - Pac-Man abaixo e à direita
            if(diff_x > diff_y)
            {
                bestDirection = _Directions.Right;
                secondBestDirection = _Directions.Down;
            } else {
                bestDirection = _Directions.Down;
                secondBestDirection = _Directions.Right;
            }
        } else if (pacIsBelow && pacIsToTheLeft)
        {
            //! Último quadrante - Pac-Man abaixo e à esquerda
            if(diff_x > diff_y)
            {
                bestDirection = _Directions.Left;
                secondBestDirection = _Directions.Down;
            } else {
                bestDirection = _Directions.Down;
                secondBestDirection = _Directions.Left;
            }
        } else {
            //! Should not reach this point
            throw new Error();
        }

        var cur_pos_x = this.x; //! Posição atual em x
        var cur_pos_y = this.y; //! Posição atual em y

        //! Se perseguindo, a IA deve ir em direção à coordenada mais próxima do Pac-Man.
        //! Se fugindo, a IA deve ir em direção contrária à coordenada mais próxima do Pac-Man.
        console.log("indo para direção", bestDirection);
        this.move(bestDirection);
        var moved = this.x !== cur_pos_x || this.y !== cur_pos_y;

        if(!moved)
        {
            console.log("não deu certo. indo agora para: ", secondBestDirection);
            /*! Não foi possível mover para a direção dada acima, portanto tentamos mover para a outra melhor direção !*/
            cur_pos_x = this.x;
            cur_pos_y = this.y;
            moved = this.move(secondBestDirection);
            moved = this.x !== cur_pos_x || this.y !== cur_pos_y;
            if (!moved) {
                //! Ainda assim, não foi possível mover para a segunda direção :/ 
                //! Portanto movemos para onde a IA veio
                this.backtrack(bestDirection, secondBestDirection);
            }
        }
    };

    move(dir_v)
    {
        if(this.state === _States.Flee)
        {
            dir_v = this.reverse_dir(dir_v);
        }
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
       if(this.backtracktimer === 0)
       {
           //! Não podemos alterar essa direção caso o backtracking esteja acontecendo
           this.rev_dir = this.reverse_dir(dir_v);
       }
    };
    
}