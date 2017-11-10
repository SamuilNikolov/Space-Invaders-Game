function Bullet(x,y)
{
this.x =x;
this.y = y;
this.r = 7;
this.toDelete = false;
this.show = function(){
  fill(255,0,0);
  noStroke();
  ellipse(this.x,this.y,3,this.r*2);
}
this.dissappear = function(){
  this.toDelete = true;
}
this.hitsAlien = function(alien){
  var d = dist(this.x, this.y, alien.x, alien.y);
  if (d<this.r + alien.r) {
    return true;
  }
  else {
      return false;
  }

}
this.hitsZorg = function(zorg){
  var d = dist(this.x, this.y, zorg.x, zorg.y);
  if (d<this.r + zorg.r) {
    return true;
  }
  else {
      return false;
  }

}
this.shoot = function(){
  this.y=this.y-4;
}
}
