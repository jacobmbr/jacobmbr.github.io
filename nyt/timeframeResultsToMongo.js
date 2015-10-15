var fs          = require("fs");
var MongoClient = require("mongodb").MongoClient;
var request     = require("request");

if(!process.env.NYTAPIKEY) {throw" MUST provide NYTAPIKEY"}
if(process.argv.length < 3) {throw "MUST provide FROM and TO as ARGV in format YYYYMMDD"}

const API_KEY   = process.env.NYTAPIKEY;
const FROM      = process.argv[2];
const TO        = process.argv[3];
const QUERY     = "fq=headline:(\"refugee\")";
const API_URL   = "http://api.nytimes.com/svc/search/v2/articlesearch.json?" + QUERY + "&api-key=" + API_KEY + "&begin_date=" + FROM + "&end_date=" + TO;
const MONGO_URL = "mongodb://localhost:27017/nyt";

var mongoCollection, resultsDatabase;

request(API_URL, function(err,resp,body){

  MongoClient.connect(MONGO_URL, function(err, db) {
    if (err) {throw err}
    resultsCollection = db.collection("results");
    resultsDatabase = db;
  });

  var body = JSON.parse(body);
  var hits = body.response.meta.hits;

  if(hits > 999) {throw "MORE THAN 1000 RESULTS DOES NOT COMPUTE"}

  var nTimes = hits % 10 === 0 ? hits / 10 : parseInt(hits / 10,10) + 1;

  console.log("I have " + hits + " results, will hit api " + nTimes + " times");
  getManyResults(nTimes, 0);
});

function getManyResults(n,i) {
  request(API_URL + "&page=" + i, function(err, resp, body) {
    if (err) throw err;
    //console.log(JSON.parse(body).response.docs.length);
    JSON.parse(body).response.docs.forEach(function(el){
      console.log(el.headline.main.substr(0,100));
      resultsCollection.insert(el);
    });

    if(i < n-1) {
      // ITERATE
      setTimeout(getManyResults, 100, n, i+1)
    } else {
      if (err) throw err;
      resultsDatabase.close();
      // END 
    }
  });
}
