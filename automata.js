class automata{

    constructor(pacObj){

        this.pac = pacObj;

        this.colorA = "#64e539";
        this.thicknessA =3;
        this.colorB = "gray";
        this.thicknessB =2;
        this.colorC = "gray";
        this.thicknessC =2;
    }
    
    // this method will change the states visualization
    update(){
        if(this.pac.x > map_width/2){
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


    //draws the automata
    draw(){
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
        arc(map_width + 130, 135, 80, 80, HALF_PI, PI );
        arc(map_width + 130, 135, 80, 80, TWO_PI, HALF_PI );
        line(map_width + 105,120, map_width +  155,120);
        line(map_width + 105,120, map_width +  130,165);
        line(map_width +  130,165, map_width +  155,120);  
        strokeWeight(this.thicknessC);
        stroke (this.colorC);
        fill("yellow")
        circle(map_width +  130,170,30);
        stroke (0);
        strokeWeight(1);
        fill(0);
        text('C', map_width  + 122, 175);
       
    };




}