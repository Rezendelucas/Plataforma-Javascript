function Scene(rows, collumns){
	
	var background;
	var player;
	var imgLoader;
	var levelGrid = [];
	this.cells = [];
  		for (var r = 0; r < rows; r++) {
   			this.cells[r] = [];
   			for (var c = 0; c < collumns; c++) {
      			this.cells[r][c] = 0;
    		}
  		}
  	this.SIZE = 64; //referente ao gride;	
	this.screens = [];
	this.hardTiles = [];// tiles de objetos solidos  que nao tem interaçao nem mecanica;
};

Scene.prototype.init = function(quant,ctx){
	this.getLevel();
	this.setCells();
	this.initHardTiles(quant,ctx);
};

Scene.prototype.render = function(ctx){
  	//this.renderBackground(ctx);
  	this.renderGrid(ctx);
  	this.renderHardTiles(ctx);
  	this.renderPlayer(ctx);
};

Scene.prototype.update = function(ctx,dt){
	this.updatePlayer(dt);
};


////////////////////////////////////////////////////////



Scene.prototype.updatePlayer = function(dt){
	var numberColision = 0;
	player.mover(dt);
	for(var i = 0; i < this.hardTiles.length ; i++){
	    if(player.detectaColisao(this.hardTiles[i])){
	    	if(this.hardTiles[i].code == "floor"){
	    		player.status = "ground";
	    		player.way = "free";
	    		numberColision++;
	    		//player.y = this.hardTiles[i].y - player.height/2 - this.hardTiles[i].height/2 + 10;
	    	}
	    	if(this.hardTiles[i].code == "wall"){
	    		//verifica se a colisao ta a esquerda ou a direita
	    		// e muda os status pra "player.way = "  block-left ou block-right
	    	}
	    }
	}
	if(numberColision == 0){
		player.status = "fall";
		player.way = "block";
	}
};

Scene.prototype.renderBackground = function(ctx){
	var backgroundImage = imgLoader.images["Background_Teste"];
	ctx.drawImage(backgroundImage, 0, 0, 1280, 720);
};

Scene.prototype.renderHardTiles = function(ctx){
	var objectCubeImage = imgLoader.images["Bloco_Teste"];
	for(var i = 0; i < this.hardTiles.length ; i++){
		this.hardTiles[i].render(ctx,objectCubeImage);
	}
};

Scene.prototype.renderPlayer = function(ctx){
	var playerImage = imgLoader.images["Player_Teste"];
	player.render(ctx,playerImage);
}

Scene.prototype.renderGrid = function(ctx){
	for (var r = 0; r < this.cells.length; r++) {
    	for (var c = 0; c < this.cells[0].length; c++) {
      		if(this.cells[r][c] == 1){
        		ctx.strokeStyle = "black";
        		ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        		
      		}else{
      			//nothing
      		};
    	}
	}
};

Scene.prototype.initHardTiles = function(quant,ctx){
//floor
	for(var i = 0; i < quant; i++)
	{
		if(i < (quant/2 - 2) || i > (quant/2 + 2)){
			var objectCube = new Generic_Object();
			objectCube.x = 0 + ((objectCube.width - 8) * i);
			objectCube.y = 550;
			objectCube.width = 64;
			objectCube.height = 64;
			objectCube.type = "solid";
			objectCube.code = "floor"
			this.hardTiles.push(objectCube);
		}
	}
	
	//Walls
	var j = 0;
	for(var i = 0; i < quant; i++)
	{
		if(i < quant/2){
			var objectCube = new Generic_Object();
			objectCube.x = 28;
			objectCube.y = 487 - ((objectCube.height - 8) * i);
			objectCube.width = 70;
		    objectCube.height = 80;
			objectCube.type = "solid";
			objectCube.code = "wall";
		    this.hardTiles.push(objectCube);
		}/*else{
			var objectCube = new Generic_Object();
			objectCube.x = 800-18;
			objectCube.y = 487 - ((objectCube.height - 8) * j);
			objectCube.width = 70;
		    objectCube.height = 80;
			objectCube.type = "solid";
		    this.hardTiles.push(objectCube);
		    j++;
		}
		*/
	}
	

};

Scene.prototype.setCells = function(){
	for (var i = 0; i < this.levelGrid.length; i++) {
    	for (var j = 0; j < this.levelGrid[i].length; j++) {
      		switch (this.levelGrid[i][j]) {
      			case 1:
          			this.cells[i][j] = 1;
          			break;
        		case 2:
          			this.cells[i][j] = 2;
          			break;
        		case 3:
          			this.cells[i][j] = 3;
          			break;
        		case 4:
          			this.cells[i][j] = 4;
          			break;
        		case 5:
          			this.cells[i][j] = 5;
          			break; 
        		default:
          			this.cells[i][j] = 1;
      }
    }
  }
};

Scene.prototype.adicionarPlayerNaCena = function(player){
	this.player = player;
}

Scene.prototype.getLevel = function(){
	this.levelGrid = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]    
  ];
}
