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
  //background(255);
  noStroke();

  for(var i=0; i<60; i++) {
    i % 10 === 0 ? stroke(220,220,220) : stroke(240,240,240);
    line(
      i*windowWidth/60, 
      0,
      i*windowWidth/60, 
      windowHeight
    )
  }
  
  stroke(240,240,240); 
  for(var j=0; j < 24; j++) {
    line(
      0,
      j*windowHeight/24,
      windowWidth,
      j*windowHeight/24
    )
  }

  fill(255,0,0);
  noStroke();
  ellipse(
    (minute() * windowWidth/60) + (second()/60 * windowWidth/60),
    (hour() * windowHeight/24) + (minute()/60 * windowHeight/12) + (second()/60 * windowHeight/3600),
    2,
    2
  );

  //text(nf((hour() * windowHeight/24) + (minute()/60 * windowHeight/12) + (second()/60 * windowHeight/3600),0,2), 20, 20);
  if (second() === 0 && minute() === 0) {
    playGong(); 
    fill(255,0,0);
    line(0, hour() * windowHeight/24, windowWidth, hour()*windowHeight/24);
  }
}

function keyPressed() {
  playGong();
}

function playGong() {
  gong.isPlaying() ? console.log("already playing") : gong.play();
}

