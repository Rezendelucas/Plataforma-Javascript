function Generic_Object(){
  this.g = 0;
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 56;
  this.height = 56;
  this.angle = 0;
  this.vang = 0;
  this.type = null; //solid , dynamic
  this.color = "black";
  this.cooldown = 0;
  this.debug = true;
}

Generic_Object.prototype.render = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "red";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Generic_Object.prototype.mover = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  this.angle = this.angle + this.vang*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Generic_Object.prototype.girar = function (dt) {
  this.angle = this.angle + this.vang*dt;
  this.ax = this.am*Math.cos(Math.PI*this.angle/180);
  this.ay = this.am*Math.sin(Math.PI*this.angle/180);
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Generic_Object.prototype.detectaColisao = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+this.width) return false;
  if(this.y+this.height < alvo.y) return false;
  if(this.y > alvo.y+this.height) return false;
  return true;
};

Generic_Object.prototype.perseguirAlvo = function (alvo, dt) {
  this.ax = 10*dt*(alvo.x - this.x) - 0.05*this.vx;
  this.ay = 10*dt*(alvo.y - this.y) - 0.05*this.vy;

  //Redireciona angulo da frente para o alvo perseguido
  var dX = alvo.x - this.x;
  var dY = alvo.y - this.y;
  var dist = Math.sqrt(dX*dX+dY*dY);
  var dA = 180*Math.acos(dX/dist)/Math.PI;
  this.vang = 100*(dA - this.angle)*dt;
};
