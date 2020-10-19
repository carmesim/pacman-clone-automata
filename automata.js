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
            //"Normal":1, "Chase":2, "Flee":3, "Powered-Up":4
            switch(this.pac.state){
                case 2:
                    this.colorA = "#64e539";
                    this.thicknessA =3;
                    this.colorB = "gray";
                    this.thicknessB =2;
                    break;
                case 3:
                    this.colorA = "gray";
                    this.thicknessA =2;
                    this.colorB = "#64e539";
                    this.thicknessB =3;
                    break;
                default:
                    break;
            }

        }else{
            if(this.pac.state == 4){
                this.colorA = "gray";
                this.thicknessA =2;
                this.colorB = "#64e539";
                this.thicknessB =3;
            }else{
                this.colorA = "#64e539";
                this.thicknessA =3;
                this.colorB = "gray";
                this.thicknessB =2;
            }
        }
    }


    //draws the automata
    draw(){
        if (this.isGhost == true){

            fill("yellow");
            strokeWeight(this.thicknessA);
            stroke (this.colorA);
            circle(map_width +  70,120,30);

            fill(0);
            textSize(18);
            stroke (0);
            strokeWeight(1);
            text('C', map_width  + 62, 125);

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
            text('S', map_width  + 117, 195);
            stroke("yellow");
            fill("yellow");
            textSize(12)
            strokeWeight(1);
            text('r - Renasce', map_width  + 20, 250);
            text('pp - Pac-man pega power up', map_width  + 20, 270);
            text('pa - power up acabou', map_width  + 20, 290);
            stroke (0);
            fill(0);

        }else{
            fill("yellow");
            strokeWeight(this.thicknessA);
            stroke (this.colorA);
            circle(map_width +  90,120,30);
            fill(0);
            textSize(18);
            stroke (0);
            strokeWeight(1);
            text('A', map_width  + 82, 125);
            stroke (100);
            fill("yellow");
            strokeWeight(this.thicknessB);
            stroke (this.colorB);
            circle(map_width +  170,120,30);
            fill(0);
            stroke (0);
            strokeWeight(1);
            text('B', map_width  + 165, 125);
            stroke (100);
            strokeWeight(2);
            noFill()
            arc(map_width + 130, 140, 80, 105, PI + QUARTER_PI , TWO_PI - QUARTER_PI);
            line(map_width + 105,120, map_width +  155,120);
            strokeWeight(this.thicknessC);
            stroke (this.colorC);
            stroke (0);
            strokeWeight(1);
            fill(0);
            

        }
       
    };




}