var xn, yn, rand;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  xn = windowWidth / 100;
  yn = windowHeight / 100;
  ym = windowHeight/2;
  xm = windowWidth/2;
  rand = random(0,255)
  textSize(12)
}

function draw() {
  //background(255);
  rand = rand > 0 ? rand - 0.3 : 255;
  for(var i = 0; i < xn; i++) {
    for(var j = 0; j < yn; j++) {
      //fill(map(((xn-i)*(yn-j)),0,xn*yn,50,255))
      colorMode(RGB);
      fill(
        map(map(abs(yn/2-j),0,yn/2,0,10) + map(abs(xn/2-i),0,xn/2,0,10),0,25,255,0)
      )
      strokeWeight(1);

      push();
      translate(i*110+(map(xm-mouseX,xm,-xm,-100,100)),j*110+(map(ym-mouseY,ym,-ym,-100,100)));
      rotate(radians((i+j) % 2 === 0 ? mouseX : mouseY));
      rect(0,0,100,100);
      pop();
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  xn = windowWidth / 100;
  yn = windowHeight / 100;
  ym = windowHeight/2;
  xm = windowWidth/2;
}
