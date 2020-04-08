const reqModule = require("request");
const fs = require("fs");
const express = require("express");
const app = express();
const firebase = require('firebase');

let rawData = fs.readFileSync("token.json");
let token = JSON.parse(rawData);

let brawlToken = token.brawlToken;

//firebase initialization

let firebaseInitRaw = fs.readFileSync("firebaseInit.json");
let firebaseInit = JSON.parse(firebaseInitRaw);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseInit);
}

const firestore = firebase.firestore();

//mode 
var GEM_GRAB = 'gemGrab';
var BRAWL_BALL = 'brawlBall';
var SOLO_SHOWDOWN = 'soloShowdown';
var DUO_SHOWDOWN = 'duoShowdown';
var TAKEDOWN = 'takedown';
var HEIST = 'heist';
var BIG_GAME = 'bigGame';
var BOUNTY = 'bounty';
var LONE_STAR = 'loneStar';

function isTrio(mode){
  if(mode === GEM_GRAB || mode === BRAWL_BALL || mode === HEIST || mode === BOUNTY){
    return true;
  }
  return false;
}
function isSolo(mode){
  if(mode === SOLO_SHOWDOWN || mode === TAKEDOWN || mode === LONE_STAR){
    return true;
  }
  return false;
}
function isDuo(mode) {
  if (mode === DUO_SHOWDOWN) {
    return true;
  }
  return false;
}


app.get("/", (req, res) => {
  let tag = req.query.tag;
  let tagEscape = escape(tag);
  if (tag === undefined) {
    res.send("please put your tag");
    return;
  }

  var url = "https://api.brawlstars.com/v1/players/" + tagEscape + "/battlelog";
  const auth = `Bearer ${brawlToken}`;
  console.log("auth ", auth);
  const options = {
    uri: url,
    headers: {
      authorization: auth,
    },
  };

  reqModule(options, function (err, response, body) {
    //console.log(body);
    var battleLogJson = JSON.parse(body);
    //res.send(body);
    //console.log(battleLogJson);
    //send(body);
/*     reqModule.post(slackOptions, function (err, httpResponse, slackBody) { */
      // console.log(slackBody);
    /* }); */
    if (battleLogJson.items == undefined) {
      res.send(`${body}`);
      return;
    }
    let items = battleLogJson.items;
    for(let i = 0; i < items.length ; i ++){
      console.log(items[i]);
      let item = items[i];
      let mode = item.event.mode;

      if(isTrio(mode)){
        handleTrio(item, tag);
      } else if(isDuo(mode)){
        handleDuo(item, tag);
      } else if(isSolo(mode)){
        handleSolo(item, tag);
      } else{
        console.log(`${mode} is not handled.`);
      }

    }
    res.send("battle logs are successfully updated");
  });
  //  res.send("express server");
});

function makeDateTimeFormat(time) {
    var year = time.substring(0, 4);
    var month = time.substring(4, 6);
    var date = time.substring(6, 8);
    var hour = time.substring(9, 11);
    var minute = time.substring(11, 13);
    var second = time.substring(13, 15);
    var dateTimeFormatStr =
        year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    //console.log(dateTimeFormatStr);
    return dateTimeFormatStr;
}


function handleSolo(item, tag){
  console.log('handleSolo');
}
function handleDuo(item, tag){
  console.log('handle Duo');
}
function handleTrio(item, tag){
  let battle = item.battle;
  let result = battle.result;
  let duration = battle.duration;
  let trophyChange = battle.trophyChange;

  let teams = battle.teams;
  let isPowerPlay = false;

  let brawler_name = null;
  let power = null;
  let trophies = null;
}

let port = 443;

app.listen(port, () => {
  console.log(`http server port on ${port}`);
});
