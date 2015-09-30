var tables = {
  "day": { sortedQuakes: [], times: [] },
  "week": { sortedQuakes: [], times: [] },
  "month": { sortedQuakes: [], times: [] }
}; 
var i = 0;
var geiger;
var secsElapsed = 0;
var totalDuration = 10000;

var timeFrameWord = "day"; // adjust timeFrame accordingly!
var timeFrame = 24 * 60 * 60 * 1000;

var sortedQuakes = [];
var beginning = 0;
var timeElapsed = 0;
var speedFactor = timeFrame/totalDuration;
var showLines = false;
var p;

function preload() {
  p = createP("<br><br>Loading datasets for day, week &amp; month. <br> This may take a while...<br><br>It will loop through the last day first, then last week, then last month.<br> Press any key for lines &amp; sound.");
  tables.week.table =   loadTable("./all_week.csv");
  tables.day.table =    loadTable("./all_day.csv");
  tables.month.table =  loadTable("./all_month.csv");

  geiger = loadSound("./geiger.wav");
}

function setup() {
  removeElements();
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  var arr = ["week","day", "month"];

  for(var idx in arr){
    tables[arr[idx]].table.rows.splice(1,tables[arr[idx]].table.rows.length).forEach(function(el){
      tables[arr[idx]].times.push(new Date(el.getString(0)).getTime());
      tables[arr[idx]].sortedQuakes.push(el);
    });
    tables[arr[idx]].times.sort(function(a,b){return a-b});
    tables[arr[idx]].sortedQuakes.sort(function(a,b){
      return (new Date(a.getString(0)).getTime() - new Date(b.getString(0)).getTime());
    });
  }
}

function startEllipse(x,y,mag) {
  //geiger.play();
  var maxSize = 400;
  var duration = 300;
  var circles = 50;
  var c = 1;
  var timeStamp = parseInt(millis(),10);
  if(showLines) {
    geiger.play();
    strokeWeight(0.5);
    stroke(255,100,150,255);
    line(0,y,windowWidth,y);
    line(x,0,x,windowHeight);
  }

  for(var d = 0; d < circles; d++){
    setTimeout(function(d){
    colorMode(HSB,255);
    fill(map(d,0,circles,60,10),255,255, map(d,0,circles,0,70));
    ellipse(
      x,
      y,
      d/circles*map(mag,0,6,0,maxSize),
      d/circles*map(mag,0,6,0,maxSize)
    );
    }, d*duration/circles,d);
  }
}

function draw() {
  if(beginning === 0) {
    beginning = millis();
  }
  timeElapsed = millis() - beginning;

  if(i < tables[timeFrameWord].times.length) {
    fill(0, 20);
    rect(0,0,width,height);
    if(speedFactor*timeElapsed > tables[timeFrameWord].times[i]-tables[timeFrameWord].times[0]){
      startEllipse(
        map(parseInt(tables[timeFrameWord].sortedQuakes[i].getString(2),10),-180,180,0,windowWidth),
        //w2ndowHeight/2,
        map(parseInt(tables[timeFrameWord].sortedQuakes[i].getString(1),10),-90,90,0,windowHeight),
        parseInt(tables[timeFrameWord].sortedQuakes[i].getString(4),10)
      );
      i++;
    }
  } else {
    beginning = 0;
    i = 0;
    switch(timeFrameWord){
      case "day":
        timeFrameWord = "week";
        timeFrame = 7*86400000;
        totalDuration = 20000;
        break;
      case "week": 
        timeFrameWord = "month";
        timeFrame = tables.month.table.getRowCount();
        totalDuration = 30000;
        break;
      case "month":
        timeFrameWord = "day";
        timeFrame = 86400000;
        totalDuration = 10000;
        break;
    }
  }
  fill("red");
  noStroke();
  var d = new Date(tables[timeFrameWord].times[i]);
  text("Showing last " + timeFrameWord + ", currently at " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + ", " + d.getHours() +":"+d.getMinutes() + "  |  press any key for lines & sound",10,windowHeight-10);
  stroke("red");
  strokeWeight(2);
  line(0,windowHeight,map(i,0,tables[timeFrameWord].times.length,0,windowWidth),windowHeight);
}

function keyPressed() {
  showLines = true;
}

function keyReleased() {
  showLines = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
