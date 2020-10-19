
const States     = {"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4, "Dead": 5}
const Directions = {"Up":1, "Right": 2, "Left": 3, "Down": 4}

function AI_update()
{
	//! Primeiros devemos ver qual o estado do Pac-Man
	if(pac.state == States.Normal)
	{
		//! Pac-Man normal, então a IA deve segui-lo
		ai.state == States.Chase;
	} else {
		//! Pac-Man pegou o power-up, então a IA deve fugir
		ai.state == States.Flee;
	}

	/*! Imagine que, do ponto onde a IA está, uma linha horizontal e uma linha vertical são desenhadas,
    	de modo a definir quatro quadrantes. (é pleonasmo isso? kkkkkkk)
        Devemos encontrar em qual quadrante o Pac-Man está, de modo a seguir (ou fugir) de acordo.
    !*/
  
  	const diff_x     = abs(pac.x, ai.x);  //! Distância entre a coord. x entre os dois
  	const diff_y     = abs(pac.y, ai.y);  //! Distância entre a coord. y entre os dois
  	const pacIsAbove = pac.x < ai.x;      //! Define se o Pac-Man está acima da IA
  	const pacIsBelow = pac.x > ai.x;      //! Define se o Pac-Man está abaixo da IA
  	const pacIsToTheRight = pac.y > ai.y; //! Define se o Pac-Man está à direita da IA
    const pacIsToTheLeft  = pac.y < ai.y; //! Define se o Pac-Man está à esquerda da IA
    
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

    var moved = false;
    //! Se perseguindo, a IA deve ir em direção à coordenada mais próxima do Pac-Man.
    //! Se fugindo, a IA deve ir em direção contrária à coordenada mais próxima do Pac-Man.
    moved = ai.move_if_possible(bestDirection);
    if(!moved)
    {
    /*! Não foi possível mover para a direção dada acima, portanto tentamos mover para a outra melhor direção !*/
      moved = ai.move_if_possible(secondBestDirection);
      if (!moved) {
        //! Ainda assim, não foi possível mover para a segunda direção :/ 
        //! Portanto movemos para onde a IA veio
        ai.backtrack();
      }
    }  
}

//! Colocar a verificação de States.Fleeing em move_if_possible