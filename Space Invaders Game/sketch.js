var ship;
var ammo=60;
var points = 0;
var aliens = [];
var zorgs = [];
var meduzas = [];
var bullets = [];
var zorgHealth = [];
var meduzaHealth = [];
var explozionAlien ;
var hitZorg;
var hitMeduza;
var shooting;
var img;
var win=false;
var alienImgs=[];
var zorgImgs=[];
var meduzaImgs=[];
var rAlien = 0;
var rZorg = 0;
var rMeduza = 0;
var mil = 0;
var clearScreen = false;
function preload() {
  explozionAlien= loadSound("Shotgun_Blast-Jim_Rogers-1914772763.mp3");
  hitZorg= loadSound("punch_or_whack_-Vladimir-403040765.mp3");
  shooting = loadSound("Silencer-SoundBible.com-1632156458.mp3");
  hitMeduza = loadSound("Strong_Punch-Mike_Koenig-574430706.mp3")
  img = loadImage("ship.jpg");
  alienImgs[0] = loadImage("alien1.jpg");
  alienImgs[1] = loadImage("alien2.jpg");
  zorgImgs[0] = loadImage("zorg1.png");
  zorgImgs[1] = loadImage("zorg2.png");
  meduzaImgs[0] = loadImage("meduza1.jpg");
  meduzaImgs[1] = loadImage("meduza2.jpg");


}
function setup(){
  createCanvas(windowWidth-40,windowHeight-40);
  ship=new Ship();
  setTimeout(animAliens, 1000);
  setTimeout(animZorgs, 1000);
  setTimeout(animMeduzas, 1000);

//  bullet = new Bullet(width/2,height/2);
  for (var i = 0; i < 6; i++) {
    rAlien =(rAlien+1)%2;
    aliens[i]= new Alien(i*80+130,130,alienImgs[rAlien]);
  }
  for (var i = 0; i < 8; i++) {
    rMeduza =(rMeduza+1)%2;
    meduzaHealth[i]=3;
    meduzas[i]= new Meduza(i*80+50,40,meduzaImgs[rMeduza],meduzaHealth[i]);
  }
  for (var i = 0; i < 7; i++) {
    rZorg =(rZorg+1)%2;
    zorgHealth[i]=2;
    zorgs[i]= new Zorg(i*80+90,90,zorgImgs[rZorg],zorgHealth[i]);
  }
}
function draw()
{
  if (clearScreen) {
    clear();
    textSize(70);
    fill(255,0,0);
    text('GAME OVER',100,200);
    text('Points made :'+points,100,400);

  }
else if (win) {
    clear();
    textSize(70);
    fill(0,255,0);
    text('YOU WIN!',100,200);
  }
  else {

    mil=millis();
    //console.log(mil);
    background(0);
    textSize(30);
    fill(255);
    text('Ammo: '+ammo,20,30);
    text('Points: '+points,1150,30);

    ship.show();
      ship.move();





    for (var i = 0; i < bullets.length; i++){
      bullets[i].show();
      bullets[i].shoot();
      for (var j = 0; j < aliens.length; j++) {
       if (bullets[i].hitsAlien(aliens[j])) {
  aliens[j].die();
  explozionAlien.play();
  if (aliens[j].hits(ship)) {
  ship.die();

  }
  bullets[i].dissappear();
  }

  }
    }
    for (var i = 0; i < bullets.length; i++){
      bullets[i].show();
      bullets[i].shoot();
      for (var j = 0; j < zorgs.length; j++) {
       if (bullets[i].hitsZorg(zorgs[j])) {
zorgHealth[j]--;
console.log(zorgHealth[j],j);

if (zorgHealth[j]==0) {
  zorgs[j].die();
  zorgHealth[j] = zorgHealth[j+1];
  explozionAlien.play();
}
else {
  hitZorg.play();
}


    if (zorgs[j].hits(ship)) {
    ship.die();

    }
    bullets[i].dissappear();
    }

    }
    }
    for (var i = 0; i < bullets.length; i++){
      bullets[i].show();
      bullets[i].shoot();
      for (var j = 0; j < meduzas.length; j++) {
       if (bullets[i].hitsZorg(meduzas[j])) {
         meduzaHealth[j]--;
         console.log(meduzaHealth[j],j);

         if (meduzaHealth[j]==0) {
           meduzas[j].die();
           meduzaHealth[j] = meduzaHealth[j+1];
           explozionAlien.play();
         }
         else {
           hitMeduza.play();
         }

    if (meduzas[j].hits(ship)) {
    ship.die();

    }
    bullets[i].dissappear();
    }

    }
    }
    var edge = false;
    for (var i = 0; i < aliens.length; i++) {
      aliens[i].show();
      aliens[i].move();
      if (aliens[i].x>width || aliens[i].x<0) {
        edge=true;

      }

    }
    for (var i = 0; i < zorgs.length; i++) {
      zorgs[i].show();
      zorgs[i].move();
      if (zorgs[i].x>width || zorgs[i].x<0) {
        edge=true;

      }

    }
    for (var i = 0; i < meduzas.length; i++) {
      meduzas[i].show();
      meduzas[i].move();
      if (meduzas[i].x>width || meduzas[i].x<0) {
        edge=true;

      }

    }
    if (edge) {
      for (var i = 0; i < aliens.length; i++) {
        aliens[i].shiftDown();
        if (aliens[i].y>=height-60) {
          clearScreen=true;
        }
      }
    }
    if (edge) {
      for (var i = 0; i < zorgs.length; i++) {
        zorgs[i].shiftDown();
        if (zorgs[i].y>=height-60) {
          clearScreen=true;
        }
      }
    }
    if (edge) {
      for (var i = 0; i < meduzas.length; i++) {
        meduzas[i].shiftDown();
        if (meduzas[i].y>=height-60) {
          clearScreen=true;
        }
      }
    }
    for (var i = bullets.length-1; i >=0 ; i--) {
  if (bullets[i].toDelete==true) {
    bullets.splice(i,1);
  }

  }
  for (var i = aliens.length-1; i >=0 ; i--) {
  if (aliens[i].toDie==true) {
  aliens.splice(i,1);
  points+=10;
  }

  }
  }
  for (var i = zorgs.length-1; i >=0 ; i--) {
  if (zorgs[i].toDie==true) {
  zorgs.splice(i,1);
  points+=20;

  }

  }
  for (var i = meduzas.length-1; i >=0 ; i--) {
  if (meduzas[i].toDie==true) {
  meduzas.splice(i,1);
  points+=30;
  }

  }
  if (aliens.length==0 && zorgs.length==0 && meduzas.length==0) {
    win=true;
  }
    console.log(aliens.length, zorgs.length, meduzas.length);

  }


function animAliens() {
  for (var i = 0; i < aliens.length; i++) {
aliens[i].animate();

  }
  setTimeout(animAliens, 1000);
}
function animZorgs() {
  for (var i = 0; i < zorgs.length; i++) {
zorgs[i].animate();

  }
  setTimeout(animZorgs, 1000);
}
function animMeduzas() {
  for (var i = 0; i < meduzas.length; i++) {
meduzas[i].animate();

  }
  setTimeout(animMeduzas, 1000);
}
function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}


function keyPressed() {
  if (key === ' ') {
    if (ammo>0) {
      console.log(ammo);
      var bullet = new Bullet(ship.x+25, height);
      bullets.push(bullet);
      shooting.play();
      ammo--;
    }
    else {
      clearScreen=true;
    }


  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
