function Meduza(x,y,meduza,health)
{
this.x =x;
this.y = y;
this.r = 20;
this.toDie = false;
this.xdir =1;
this.img = meduza;
this.imgIndex =0;
this.show = function(){
  fill(0,255,0,150);
image(meduzaImgs[this.imgIndex],this.x-16,this.y-18);
///ellipse(this.x,this.y,this.r*2,this.r*2);

}
this.animate = function(){
  this.imgIndex = (this.imgIndex+1)%2;


}
this.die = function(){

  this.toDie = true;


}
this.hits = function(ship){
  var d = dist(this.x, this.y, ship.x, ship.y);
  if (d<this.r + 27) {
    return true;
  }
  else {
      return false;
  }

}
this.shiftDown = function(){
  this.xdir*=-1;
this.y+=this.r*2;
}
this.move = function(){
  this.x = this.x + this.xdir;

}
}
