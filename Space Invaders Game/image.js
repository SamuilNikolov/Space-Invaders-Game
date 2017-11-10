var images = [];
var totalImages = 2;
var counterImage = 0;
var loadingImage = false;

var loading = true;

var loadedBkg;
var index = 0;


function loadImageElement(filename) {
  loadImage(filename, imageLoaded);

  function imageLoaded(image) {
    console.log(filename);
    images.push(image);
    counterImage++;
    if (counterImage == totalImages) {
      loadingImage = true;
    }
  }
}

function setup() {
  clear();
frameRate(1);


  for (var i = 1; i <= totalImages; i++) {
    loadImageElement("alien" + i + ".jpg");
  }

  loadedBkg = select('.danBkg');
}

function draw() {
  if ((loadingImage)) {
    loading = false;
  }

  if (!loading) {
    clear();
    image(images[index],0,0);
    index = (index+1)%2;
  /*
    textAlign(CENTER, CENTER);
    textSize(120);
    textStyle(BOLD);
    fill("#8861A4");
    text("SUCCESS!!", width / 2, height / 2);
    */
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
