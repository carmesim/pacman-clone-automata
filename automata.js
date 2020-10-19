class automata{

    constructor(pacObj, isGhost){

        this.pac = pacObj;
        this.isGhost = isGhost;
        this.colorA = "#64e539";
        this.thicknessA =3;
        this.colorB = "gray";
        this.thicknessB =2;
        this.colorC = "gray";
        this.thicknessC =2;


    }
    
    // this method will change the states visualization
    update(){
        if (this.isGhost){
            //"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4, "Dead": 5
            switch(this.pac.state){
                case 2:
                    this.colorA = "#64e539";
                    this.thicknessA =3;
                    this.colorB = "gray";
                    this.thicknessB =2;
                    this.colorC = "gray";
                    this.thicknessC =2;
                    break;
                case 3:
                    this.colorA = "gray";
                    this.thicknessA =2;
                    this.colorB = "gray";
                    this.thicknessB =2;
                    this.colorC = "#64e539";
                    this.thicknessC =3;
                    break;
                case 5:
                        this.colorA = "gray";
                        this.thicknessA =2;
                        this.colorB = "#64e539";
                        this.thicknessB =3;
                        this.colorC = "gray";
                        this.thicknessC =2;
                        break;
                default:
                    break;
            }

        }else{
            switch(this.pac.state){
                case 1:
                    this.colorA = "#64e539";
                    this.thicknessA =3;
                    this.colorB = "gray";
                    this.thicknessB =2;
                    this.colorC = "gray";
                    this.thicknessC =2;
                    break;
                case 4:
                    this.colorA = "gray";
                    this.thicknessA =2;
                    this.colorB = "gray";
                    this.thicknessB =2;
                    this.colorC = "#64e539";
                    this.thicknessC =3;
                    break;
                case 5:

                    this.colorA = "gray";
                    this.thicknessA =2;
                    this.colorB = "#64e539";
                    this.thicknessB =3;
                    this.colorC = "gray";
                    this.thicknessC =2;
                    break;
                
                default:
                    break;
            }
            
        }
    }


    //draws the automata
    draw(){
        if (this.isGhost == true){

            if (mouseIsPressed){
                print('Mouse X: ', mouseX, 'Y: ', mouseY);    
            }

            fill("yellow");
            strokeWeight(this.thicknessA);
            stroke (this.colorA);
            circle(map_width +  70,120,30);

            fill(0);
            textSize(18);
            stroke (0);
            strokeWeight(1);
            text('P', map_width  + 62, 125);

            stroke (100);
            fill("yellow");
            strokeWeight(this.thicknessB);
            stroke (this.colorB);
            circle(map_width +  170,120,30);

            fill(0);
            stroke (0);
            strokeWeight(1);
            text('M', map_width  + 163, 125);

            stroke (100);
            strokeWeight(2);
            noFill()
            arc(map_width + 110, 135, 80, 100, HALF_PI, PI );

            
            //arrow tip M -> C
            line(453,120, 460, 114);
            line(453,120, 460, 126);

            //arrow tip S -> C
            line(430, 138, 422, 145 );
            line(430, 138, 438, 145 );

            //arrow tip C -> S
            line(478,175, 468, 175);
            line(480,174, 481, 164);

            //arrow tip S -> M
            line(512, 128,504,129)
            line(512, 128,513,137)


            line(map_width + 87,120, map_width +  155,120);
            line(map_width + 87,120, map_width +  125,185);
            line(map_width +  125,185, map_width +  155,120);  
            strokeWeight(this.thicknessC);
            stroke (this.colorC);
            fill("yellow")
            circle(map_width +  125,190,30);
            stroke (0);
            strokeWeight(1);
            fill(0);
            text('F', map_width  + 117, 195);
            stroke("yellow");
            fill("yellow");
            textSize(10)
            strokeWeight(1);
            stroke(0);
            text('r - Renasce', map_width  + 20, 250);
            text('pp - Pac-man pega power up', map_width  + 20, 265);
            text('pa - Power up acabou', map_width  + 20, 283);
            text('pt - Pac-man toca o fantasma', map_width  + 20, 298);

            text ('r', 478,116);
            
            push();
            translate (455,153);
            rotate (45);
            text ('pp', 0,0);
            pop();

            text ('pa', 423,176);   

            push();
            translate(509,159);
            rotate (0);
            text('pt', 0,0);
            pop();

            stroke (0);
            fill(0);

            
            

        }else{
            

            fill("yellow");
            strokeWeight(this.thicknessA);
            stroke (this.colorA);
            circle(map_width +  70,120,30);

            fill(0);
            textSize(18);
            stroke (0);
            strokeWeight(1);
            text('N', map_width  + 62, 125);

            stroke (100);
            fill("yellow");
            strokeWeight(this.thicknessB);
            stroke (this.colorB);
            circle(map_width +  170,120,30);

            fill(0);
            stroke (0);
            strokeWeight(1);
            text('M', map_width  + 163, 125);

            stroke (100);
            strokeWeight(2);
            noFill()
            arc(map_width + 110, 135, 80, 100, HALF_PI, PI );
            arc(map_width + 122, 150, 100, 120, PI + QUARTER_PI, TWO_PI - QUARTER_PI );

            //edges 
            line(map_width + 87,120, map_width +  155,120);
            line(map_width + 87,120, map_width +  125,185);

            //arrow tip N -> M
            line(519,110, 518, 100);
            line(519,110, 509, 110);

            //arrow tip M -> N
            line(453,120, 460, 114);
            line(453,120, 460, 126);

            //arrow tip N -> P
            line(478,175, 468, 175);
            line(480,174, 481, 164);

            //arrow tip P -> N
            line(430, 138, 422, 145 );
            line(430, 138, 438, 145 );

            //line(map_width +  125,185, map_width +  155,120);  
            strokeWeight(this.thicknessC);
            stroke (this.colorC);
            fill("yellow")
            circle(map_width +  125,190,30);
            stroke (0);
            strokeWeight(1);
            fill(0);
            text('P', map_width  + 117, 195);
            stroke("yellow");
            fill("yellow");
            textSize(10)
            strokeWeight(1);
            stroke(0);
            text('tf - Tocado pelo fantasma', map_width  + 20, 250);
            text('r - Renasce', map_width  + 20, 270);
            text('pp - Pac-man pega power up', map_width  + 20, 285);
            text('pa - Power up acabou', map_width  + 20, 303);
            
            text ('tf', 478,86);
            text ('r', 478,116);
            
            push();
            translate (455,153);
            rotate (45);
            text ('pp', 0,0);
            pop();

            text ('pa', 423,176);   

            

            stroke (0);
            fill(0);
            

        }
       
    };




}