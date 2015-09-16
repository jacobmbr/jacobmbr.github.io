function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
}

function draw() {
  //background(255);

  push();
  translate(100,200);
  rotate(radians(mouseX));
  rect(0,0,100,100);
  pop();

  push();
  translate(300,200);
  rotate(radians(mouseY));
  rect(50,0,100,100);
  pop();
}
