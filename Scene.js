function Scene(){
	var background;
	var player;
	var imgLoader;
	this.screens = [];
	this.hardTiles = [];// tiles de objetos solidos  que nao tem interaçao nem mecanica;
}

Scene.prototype.init = function(quant,ctx){
	//floor
	for(var i = 0; i < quant; i++)
	{
		var objectCube = new Generic_Object();
		objectCube.x = 0 + ((objectCube.width - 11) * i);
		objectCube.y = 550;
		objectCube.type = "solid";
		this.hardTiles.push(objectCube);
	}
	
	//Walls
	var j = 0;
	for(var i = 0; i < quant; i++)
	{
		if(i < quant/2){
			var objectCube = new Generic_Object();
			objectCube.x = 28;
			objectCube.y = 505 - ((objectCube.height - 11) * i);
			objectCube.type = "solid";
		    this.hardTiles.push(objectCube);
		}else{
			var objectCube = new Generic_Object();
			objectCube.x = 800-18;
			objectCube.y = 505 - ((objectCube.height -11 ) * j);
			objectCube.type = "solid";
		    this.hardTiles.push(objectCube);
		    j++;
		}
	}

};

Scene.prototype.render = function(ctx){
  	this.renderBackground(ctx);
  	this.renderHardTiles(ctx);
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