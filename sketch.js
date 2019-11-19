function preload(){

}

// Empty array to be filled with bubble objects later
var bubbles = [];
// Variable which will allow the mentos drop to work
var mentosDropTrigger = 0;


function setup() {


  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

// Lowering the framerate to have a nicer random bubble effect, since they are created in draw
frameRate(30);

// Creating surface bubbles
  for (b = 0; b < width; b += 10) {

var bubble = new Bubble(b, height - map(rotationX, -100, 100, 1, width), 5 + random() * 30);
// Pushing them into the empty array
bubbles.push(bubble);
  }

// Good shake threshold for this case(sparkling drink shaking)
setShakeThreshold(15);
}

// Variable which will allow another rectangle to change opacity
var opacity = 0;
// Shake will add to the liquid height
var shake = 0;
// Variables which will be used to simulate mentos drop
var mentos;
var mentosY = -40;

function draw() {
background(244, 0, 0);
// Main instructions for interactivity
push();
fill(255);
textAlign(CENTER);
textFont("Lobster");
textSize(16.5);
text("Don't spill your Coca-Cola! Keep the phone vertical", width/2, height/11);
text("You don't want to shake your drink...do you?", width/2, height/11 + 40);
text("Be careful with your fingers, you don't want to drop a mentos in here...", width/2 - 140, height/11 + 80 - 10, 280, 60);
pop();

// Creating the mentos
push();
noStroke();
mentos = ellipse(width/2, mentosY, 40, 40);
pop();

// Variable will become = 1 after a touch
if (mentosDropTrigger == 1) {
// So this function will drop the mentos
mentosDrop();

}

// Rectangle with coca cola color which will adjust to the x rotation
// shake will make it higher(visually)
push();
noStroke();
fill("#400601");
rect(0, height, width, - map(rotationX, -100, 100, 1, width) - shake);
pop();

// Opacity is decreasing each frame so that it will always come back to 0
opacity--;
// But not under it
if (opacity < 0) {

opacity = 0;

}

// Same for shake
shake--;

if (shake < 0) {

shake = 0;

}

// The foam rectangle will show the more opacity increases
// and will be higher the more shake increases
push();
noStroke();
fill(222, 179, 102, opacity);
var foam = rect(0, height, width, - map(rotationX, -100, 100, 1, width) - shake);
pop();

for (var u = 0; u < 15 + shake; u++) {
// Little ellipses will be created as random bubbles in the coca cola rectangle
push();
  stroke(191, 97, 15, 180);
  fill(217, 142, 4, 180);
ellipse(random() * width + u, height - map(rotationX, -100, 100, 1, width) - shake + random() * height + u, 10, 10);
pop();

}

//Creating surface bubbles out of the filled array
for (var b = 0; b < bubbles.length; b++) {

var bubble = bubbles[b];


bubble.display();
// This method will adapt the y of the bubbles to the coca cola level
bubble.adaptY();
// This method will randomly move the coordinates of the bubbles to simulate sparkling
bubble.foamMove();

}

// If the surface level reaches the top part of the screen
// AND the mentos has been dropped
if (bubble.y < 0 && mentosDropTrigger == 1) {

push();
background(0);
textAlign(CENTER);

fill(255);
textFont("Lobster")
textSize(18);
text("Boom. Change your clothes", width/2, height/2);
  pop();

// This makes sure the experience has ended and the x rotation doesn't change conditions
noLoop();
}

}

function mouseMoved() {

return false;

}
// When the device is shaken, the foam rectangle will appear slowly through opacity
// and the variable shake will increase making more random bubbles and increasing the foam and coca cola level(visually)
function deviceShaken() {

  opacity = opacity + 3;
    if (opacity > 255) {
      opacity = 255;
    }
    shake = shake + 1;
    if (shake > height) {
shake = height;
    }
  }

// After a touch the mentosDrop function is triggered through this variable
function touchStarted() {

mentosDropTrigger = 1;

}

// Mentos Y will increase, moving down the mentos
function mentosDrop() {

  mentosY += 8;

  // if the mentos will be under the surface level,
  //it will happen the same thing like when the device is shaken
    if (mentosY > height - map(rotationX, -100, 100, 1, width)) {
    opacity = opacity + 3;
      if (opacity > 255) {
        opacity = 255;
      }
      shake = shake + 3;
      if (shake > height) {
    shake =  height;
      }
    }

}

function touchEnded(event) {
  DeviceOrientationEvent.requestPermission();
}

// Creating the surface bubble object, handy to be used with arrays in setup and draw
function Bubble(_x, _y, _diameter) {

this.x = _x;
this.y = _y;
this.diameter = _diameter;

this.display = function() {

push();
  stroke(191, 97, 15, 180);
  fill(217, 142, 4, 180);
  ellipse(this.x, this.y, this.diameter, this.diameter);
  pop();

}

// This method will adapt the y of the bubbles to the coca cola level
this.adaptY = function() {

this.y = height - map(rotationX, -100, 100, 1, width) - shake;

}

// // This method will randomly move the coordinates of the bubbles to simulate sparkling
this.foamMove = function() {

var foamMoveDelta = 1.5

this.x = this.x + random(-foamMoveDelta, foamMoveDelta);
this.y = this.y + random(-foamMoveDelta, foamMoveDelta);

}

}
