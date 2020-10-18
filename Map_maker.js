let sclX = 10;
let sclY = 10;
let row;
let col;
let mat;
let mapa;



/*
function preload (){

	mapa = loadBytes ('https://drive.google.com/file/d/17I1W6G6JvnPK8C9YxalNdUFJ8b9t3fcM/view?usp=sharing');
	print (mapa);

}*/

function setup() {
	createCanvas(280, 360);
	background(255);
	mat = Array.from(Array(36), _ => Array(28).fill(0));
	
}

function draw() {
	
	
	gridLines();

	//row = floor(mouseY / sclY);
    //col = floor(mouseX / sclX);


    if (mouseIsPressed) {
    	if (mouseButton === LEFT) {
    		row = floor(mouseY / sclY);
    		col = floor(mouseX / sclX);
    		fill(0);
    		square (col * sclX, row * sclY, 10);
    		mat[row][col] = 1; //PREENCHENDO AS PAREDES
    		print (row, col);
    	}
    	/*
    	if (mouseButton === RIGHT) {
      	rect(25, 25, 50, 50);

    	}
    	*/
    	if (mouseButton === CENTER) { //caso vc tenha desenhado errado
      		row = floor(mouseY / sclY);
    		col = floor(mouseX / sclX);
      		fill (255);
      		square (col * sclX, row * sclY, 10);
      		mat[row][col] = 0; //coloca 0 pq eh caminho livre
      		print (row, col);
    	}
  	}
	 




    //print (row, col);

}



//  *******************     CORPO DE FUNCOES DO CODIGO *******************  //

function gridLines(){
  stroke(0);
  for(let i = 0; i <= width + sclX; i += sclX){
    line(i,0, i, height);
  }
  for(let i = 0; i <= height + sclY; i += sclY){
    line(0,i, width, i);
  }
}

function keyPressed () {
	if (keyCode == 32){
		console.clear();
		print (mat);
	}

	if (keyCode == ENTER){
		
		let json = {};

		//json.m = mat;

		var arrayToString = JSON.stringify(Object.assign({}, mat));  // convert array to string
    	json = JSON.parse(arrayToString);  // convert string to json object

		saveJSON(json, 'Official_map.json');

		//save(mat, "Mapa_Pac_man.txt");

	}
}
