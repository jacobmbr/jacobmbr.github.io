var startTime = -1;
var runTime = 0;
var minRatio
  , hrRatio
  , sHeight
  , sWidth
  , gong
;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  fill(255,0,0);
  strokeWeight(1);
  gong = loadSound("./gong.mp3");
}

function draw() {
  stroke(240,240,240);
  //background(255);

  for(var i=0; i<60; i++) {
    line(
      i*windowWidth/60, 
      0,
      i*windowWidth/60, 
      windowHeight
    )
  }
  for(var j=0; j < 12; j++) {
    line(
      0,
      j*windowHeight/12,
      windowWidth,
      j*windowHeight/12
    )
  }

  noStroke();
  ellipse(
    (minute() * windowWidth/60) + (second()/60 * windowWidth/60),
    (hour() * windowHeight/12) + (minute()/60 * windowHeight/12) + (second()/60 * windowHeight/3600),
    2,
    2
  );
  //text(nf((hour() * windowHeight/12) + (minute()/60 * windowHeight/12) + (second()/60 * windowHeight/3600),0,2), 20, 20);
  if (second() === 0 && minute() === 0) { playGong(); }
}

function keyPressed() {
  playGong();
}

function playGong() {
  gong.isPlaying() ? console.log("already playing") : gong.play();
}

