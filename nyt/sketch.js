var res, i, ref, xm, ym, objs, v, textHeight, arr, arr_from, arr_to, arrayIndex, offset, t, brightness, padding, j, searchString, stopZone;

function preload() {
  res = loadJSON("./output.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xm = windowWidth/2;
  ym = windowHeight/2;
  textFont("Georgia");
  textStyle(ITALIC);
  fill(255);
  textHeight = 16;
  padding = 15;
  offset = 0;

  nOnScreen = parseInt(windowHeight / (textHeight+padding), 10);

  arr = [];
  arr = fillArray(arr, 0, nOnScreen);

  arrayIndex = nOnScreen+1;

  t = 0;
  offset = 2;
  stopZone = 30;
}

function draw() {
  background(0,0,0);
  if (mouseIsPressed) {
    if (abs(mouseY-ym) < stopZone) {
      if( offset === 0 ) {
        v = 0;
      }
    } else {
      v = (mouseY-ym) > 0 ? (mouseY-stopZone-ym) : (mouseY+stopZone-ym);
    }
  } else {
    v = 5;
  }

  textSize(textHeight);

  // Stop if today is reached
  if( arrayIndex - nOnScreen > 0 ) {
    offset = offset + (abs(v) * sq((map(offset,0,textHeight+padding,0.1,1))));
  }

  if(offset > textHeight+padding) {
    offset = 0;
    arr = v > 0 ? decrementArray(arr) : incrementArray(arr);
  }
  colorMode(RGB);
  textStyle(BOLD);
  ref = textWidth("Refugee");

  textStyle(ITALIC);
  textSize(textHeight);
  textAlign(CENTER);
  for(j = 0; j < arr.length; j++) {
    textStyle(ITALIC);
    yOffset = (j*(textHeight+padding)) + (v > 0 ? offset : -offset);
    brightness = yOffset-ym < 0 ? (yOffset) : windowHeight/2 - (yOffset - ym);
    fill(255);
    fill(map(brightness, 0, windowHeight/2, 0,255));
    textAlign(RIGHT);
    text(arr[j].left, xm-(ref/2), yOffset);
    textAlign(LEFT);
    text(arr[j].right, xm+(ref/2), yOffset);
  }

  //textSize(textHeight);
  //textAlign(RIGHT);
  //textStyle(ITALIC);
  //text(res[i].title.substr(0,res[i].title.indexOf("Refugee")), xm-(ref/2), ym);

  textStyle(BOLD);
  textAlign(CENTER);
  fill(255);
  text("Refugee", xm, (parseInt(nOnScreen/2,10))*(textHeight+padding));
  
  //textStyle(ITALIC);
  //textAlign(LEFT);
  //text(res[i].title.substr(res[i].title.indexOf("Refugee")+7, res[i].title.length), xm+ref/2, ym);

  fill(150);
  textAlign(CENTER);
  textStyle(NORMAL);
  textSize(textHeight - 3);
  text(arr[parseInt(nOnScreen/2,10)].date.split("-").join("\n"), xm, ym +20);
  strokeWeight(4);
  stroke(255);
  
  textStyle(BOLD);
  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(textHeight-2);
  text("100 Years of NYT Headlines on Refugees", 10, textHeight);
  i = parseInt(millis() / 300, 10);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function getStringObject(arrInd) {
  ["Refugee", "refugee", "REFUGEE"].forEach(function(el){
    if(res[arrInd].title.indexOf(el) !== -1) {searchString = el}
  });

  return {
    left:   res[arrInd].title.substr(0,res[arrInd].title.indexOf(searchString)),
    right:  res[arrInd].title.substr(res[arrInd].title.indexOf(searchString)+7),
    date:   res[arrInd].pub_date
  };
}

function fillArray(arr, from, to) {
  for(var k = from; k < to + 1; k++) {
    arr[k] = getStringObject(k);
  }
  return arr;
}

function incrementArray(arr) {
  arr.splice(0,1);
  arr.push(getStringObject(arrayIndex));
  arrayIndex--;
  return arr;
}
function decrementArray(arr){
  arr.splice(arr.length-1,1);
  arr.splice(0,0, getStringObject(arrayIndex));
  arrayIndex++;
  return arr;
}
